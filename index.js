import flatFiles from 'flat-files';

console.log(flatFiles)

flatFiles(document.querySelector('#dropzone'), (files) => {
  files.forEach(file => {
    console.log(
      file.name,
      file.fullPath,
      file.getMetadata()
    );
  })
});