export interface DirectoryReaderSync {
  readEntries: (entries: FileSystemEntry[]) => void;
}

export interface FileSystemEntry {
  isDirectory: boolean;
  createReader: () => DirectoryReaderSync;
}

export interface File {

};

export type DroppedCallback = (files: FileSystemEntry[]) => void;

const flatten = (arr: any[]) => [].concat.apply([], arr);

const toArray = (arr: any) => [].slice.call(arr, 0);

const readEntries = (entry: FileSystemEntry): Promise<FileSystemEntry[]> => {
  return new Promise(resolve => {
    const reader = entry.createReader();

    // TODO: Investigate typing mismatch
    reader.readEntries(resolve as any);
  });
}

const getFilesFromEntry = (entry: FileSystemEntry): Promise<FileSystemEntry[]> => {
  if (entry.isDirectory) {
    return readEntries(entry).then(entries => {
      const promises = entries.map(getFilesFromEntry);

      return Promise.all(promises).then(result => flatten(result));
    });
  } else {
    return Promise.resolve([entry]);
  }
};

export const getFilesFromItems = (items: DataTransferItemList): Promise<FileSystemEntry[]> => {
  const promises = toArray(items).map((item: DataTransferItem) => {
    const entry = item.webkitGetAsEntry(); // webkitGetAsEntry returns any :(

    return getFilesFromEntry(entry);
  });

  return Promise.all(promises).then(files => {
    return flatten(files);
  });
}

export const getFilesFromFileSystemEntries = (fileSystemEntries: FileSystemEntry[]): Promise<File[]> => {
  return new Promise<File[]>(resolve => {
    const files: File[] = [];

    fileSystemEntries.forEach(fileSystemEntry => {
      // TODO: file method doesn't have typings
      (fileSystemEntry as any).file((file: File) => {
        files.push(file)

        if (files.length === fileSystemEntries.length) {
          resolve(files);
        }
      })
    })
  })
}


export class FileFlattener {
  dropzone: Element;
  callback: DroppedCallback;

  constructor(dropzone: Element, callback: DroppedCallback) {
    this.dropzone = dropzone;
    this.callback = callback;
  }

  subscribe() {
    const {dropzone} = this;

    dropzone.addEventListener('dragover', this.onDragOver, false);
    dropzone.addEventListener('drop', this.onDrop);
  }

  private onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  private onDrop = async (e: DragEvent) => {
    e.preventDefault();

    const {callback} = this;
    const {items} = e.dataTransfer;
    const files = await getFilesFromItems(items);
    
    callback(files);
  }
}

export const flatFiles = (dropzone: Element, callback: DroppedCallback) => {
  const flattener = new FileFlattener(dropzone, callback);

  flattener.subscribe();
};

export default flatFiles;
