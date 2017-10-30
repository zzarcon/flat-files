import React from 'react';
import {Component} from 'react';
import flatFiles from 'flat-files';
import {DropzoneWrapper} from './styled';

export default class Dropzone extends Component {
  state = {
    isDragging: false
  }

  render() {
    const {isDragging} = this.state;
    const text = isDragging ? 'Release 👋' : 'Drop a folder 📂';

    return (
      <DropzoneWrapper isDragging={isDragging} innerRef={this.saveDropzoneRef} onDragEnter={this.onDragEnter} onDragLeave={this.onDragEnd} onDrop={this.onDragEnd}>
        {text}
      </DropzoneWrapper>
    );
  }

  onDragEnd = () => {
    this.setState({
      isDragging: false
    });
  }

  onDragEnter = () => {
    console.log('onDragEnter')
    this.setState({
      isDragging: true
    });
  }

  saveDropzoneRef = (node) => {
    this.setState({dropzoneNode: node});

    flatFiles(node, (files) => {
      const {onDroppedFiles} = this.props;

      onDroppedFiles(files);
    });
  }
}