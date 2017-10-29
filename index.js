import flatFiles from 'flat-files';

const dropzone = document.querySelector('#dropzone');

flatFiles(dropzone, (files) => {
  files.forEach(file => {
    console.log(
      file.name,
      file.fullPath,
      file.getMetadata((metadata) => {
        console.log(metadata);
      })
    );
  })
});

const onDragFinish = (e) => {
  const {target} = e;

  target.classList.remove('drag-enter');
  target.innerText = 'Drop something';
};

dropzone.addEventListener('dragenter', (e) => {
  const {target} = e;

  target.classList.add('drag-enter');
  target.innerText = 'Release it!';
});

dropzone.addEventListener('dragleave', onDragFinish);
dropzone.addEventListener('drop', onDragFinish);