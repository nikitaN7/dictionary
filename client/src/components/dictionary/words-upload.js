import React, { Component } from 'react';
import TargetBox from './target-box';

class WordsUpload extends Component {

  fileInput = React.createRef();

  state = {
    dropFile: [],
    fileError: ''
  }

  fileValidation(files) {
    const allowedExtension = /(\.xlsx)$/i;
    const fileName = files[0].name;

    this.removeError();

    if (files.length > 1) {
      this.setState({
        fileError: 'Only 1 file must be load'
      })

      return false;
    }

    if (!allowedExtension.exec(fileName)) {
      this.setState({
        fileError: 'Only xlsx file is allowed'
      })

      return false;
    }

    return true;
  }

  removeError = () => {
    this.setState({
      fileError: ''
    })
  }

  setFiles = (files) => {
    if (this.fileValidation(files)) {
      console.log(files[0])
    }
  }

  handleFileDrop = (monitor) => {
    if (monitor) {
      const files = monitor.getItem().files;
      this.setFiles(files);
    }
  }

  handleFile = () => {
    const files = this.fileInput.current.files;
    this.setFiles(files);
  }

  render() {
    const { fileError } = this.state;

    return (
      <TargetBox
        onDrop={this.handleFileDrop}
        error={fileError}
        removeError={this.removeError}
        handleFile={this.handleFile}
        fileInput={this.fileInput} />
    )
  }
}

export default WordsUpload;