# flat-files [![Build Status](https://travis-ci.org/zzarcon/flat-files.svg?branch=master)](https://travis-ci.org/zzarcon/flat-files) https://zzarcon.github.io/flat-files
> Get a flatten array of dropped files using FileSystem api

# Demo

https://zzarcon.github.io/flat-files

# Usage

```javascript
import flatFiles from 'flat-files';

flatFiles(document.querySelector('#dropzone'), (files: FileSystemEntry[]) => {
  files.forEach(file => {
    console.log(
      file.name,
      file.fullPath,
      file.getMetadata()
    );
  })
});

```

# Use case

Imagine you have drag & drop support in your app, thats great. Now imagine the use drops a folder containing a folder containing a folder, containing a folder... you get the idea.

<p align="left">
  <img src="example/matrioska.jpg" width="200">
</p>

All that I want is to have a nice way to get all those files and do something with them (upload them, show a preview, etc). Thats what **flat-files** gives to you, it deals with the [FileSystem](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem) and gives a flatten array of [FileSystemEntry](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry)

<p align="left">
  <img src="example/homer.gif" width="200">
</p>

# TODO

* [ ] Release script
* [ ] Browser support
* [ ] Error callback