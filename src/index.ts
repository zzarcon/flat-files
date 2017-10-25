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

  private onDrop = (e: DragEvent) => {
    e.preventDefault();

    const {getFilesFromEntry, callback} = this;
    const {items} = e.dataTransfer;
    const promises = Array.from(items).map((item: DataTransferItem) => {
      const entry = item.webkitGetAsEntry() as FileSystemEntry;

      return getFilesFromEntry(entry);
    });

    return Promise.all(promises).then(files => {
      callback(flatten(files));
    });
  }

  private readEntries(entry: FileSystemEntry): Promise<FileSystemEntry[]> {
    return new Promise(resolve => {
      const reader = entry.createReader();

      reader.readEntries(resolve);
    });
  }

  private getFilesFromEntry = (entry: FileSystemEntry): Promise<FileSystemEntry[]> | FileSystemEntry => {
    const {getFilesFromEntry, readEntries} = this;

    if (entry.isDirectory) {
        return readEntries(entry).then(entries => {
          const promises = entries.map(getFilesFromEntry);

          return Promise.all(promises).then(result => flatten(result));
        });
    } else {
      return entry;
    }
  };
}

export const flatFiles = (dropzone: Element, callback: DroppedCallback) => {
  const flattener = new FileFlattener(dropzone, callback);

  flattener.subscribe();
};

export default flatFiles;
