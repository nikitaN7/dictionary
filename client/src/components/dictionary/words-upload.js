import React, { Component } from 'react';
import TargetBox from './target-box';
import XLSX from 'xlsx';
import { getListFromFile } from '../../function/getListFromFile';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchWords } from '../../actions/word-list-fetch';

class WordsUpload extends Component {

  fileInput = React.createRef();

  state = {
    fileError: '',
    isFileLoading: false,
    isFileSuccess: false
  }

  fileValidation(files) {
    const allowedExtension = /(\.xlsx)$/i;
    const fileName = files[0].name;

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

  handleResetForm = () => {
    this.setState({
      fileError: '',
      isFileLoading: false,
      isFileSuccess: false
    })
  }

  setFiles = (files) => {
    if (!this.fileValidation(files)) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {type: 'array'});

      const wordsList = getListFromFile(workbook);

      this.setState({
        isFileLoading: true
      })

      axios.post('/api/putManyData', wordsList)
        .then((res) => {
          this.setState({
            isFileLoading: false,
            isFileSuccess: true
          })
          this.props.fetchWords();
        })
        .catch((err) => {
          this.setState({
            fileError: err.message,
            isFileLoading: false
          })
        });
    };

    reader.readAsArrayBuffer(file);
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
    const { fileError, isFileSuccess, isFileLoading } = this.state;

    return (
      <TargetBox
        onDrop={this.handleFileDrop}
        error={fileError}
        isSuccess={isFileSuccess}
        isLoading={isFileLoading}
        onResetForm={this.handleResetForm}
        handleFile={this.handleFile}
        fileInput={this.fileInput} />
    )
  }
}

export default connect(
  null,
  { fetchWords }
)(WordsUpload);