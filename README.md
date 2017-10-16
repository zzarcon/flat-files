# flat-files
> Get a flatten array of dropped files using FileSystem api

# Usage

```javascript
import flatFiles from 'flat-files';

document.querySelector('#dropzone').addEventListener('drop', (e) => {
  const files = flatFiles(e.dataTransfer);
});

// vs 

flatFiles(document.querySelector('#dropzone'), (files) => {

});

```

# TODO

* Typescript