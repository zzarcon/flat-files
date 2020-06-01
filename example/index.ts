import {getFilesFromItems, getFilesFromFileSystemEntries} from '../src';

const element = document.querySelector('#dropzone');

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
}

const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
}

const onFileDropped = async (dragEvent: DragEvent) => {
  const {items} = dragEvent.dataTransfer;

  const fileSystemEntries = await getFilesFromItems(items);

  console.log({fileSystemEntries})
  const files = await getFilesFromFileSystemEntries(fileSystemEntries);
  console.log(files);
}

element.addEventListener('dragover', onDragOver, false);
element.addEventListener('dragleave', onDragLeave, false);
element.addEventListener('drop', onFileDropped);