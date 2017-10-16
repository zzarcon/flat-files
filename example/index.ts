import flatFiles from '../src';


const element = document.querySelector('#dropzone');

flatFiles(element, (files) => {
  console.log('files', files.length, files)
});