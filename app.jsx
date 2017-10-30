import React from 'react';
import {Component} from 'react';
import ReactJson from 'react-json-view';
import Dropzone from './dropzone';
import {AppWrapper, JsonViewerWrapper} from './styled';

export default class App extends Component {
  state = {
    files: null
  }

  onDroppedFiles = (droppedFiles) => {
    const promises = droppedFiles.map((file) => (
      new Promise(resolve => {
        file.getMetadata(({size, modificationTime}) => {
          const {name, fullPath} = file;

          resolve({
            name,
            fullPath,
            size,
            modificationTime
          })
        });
      })
    ));

    Promise.all(promises).then(result => {
      this.setState({
        files: {
          length: result.length,
          files: result
        }
      });
    });
  }

  renderJson() {
    const {files} = this.state;
    if (!files) return;

    return (
      <JsonViewerWrapper>
        <ReactJson
          src={files}
          displayDataTypes={false}
          enableClipboard={false}
          indentWidth={2}
          displayObjectSize={false}
          name="Dropped Files"
          theme="flat"
        />
      </JsonViewerWrapper>
    );
  }

  render() {
    return (
      <AppWrapper>
        <Dropzone 
          onDroppedFiles={this.onDroppedFiles}
        />
        {this.renderJson()}
      </AppWrapper>
    );
  }
}