import React, { useRef, useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import TargetBox from './target-box';
import { xlsFileUpload } from '../../utils/xlsFileUpload';
import { fetchWords } from '../../actions/word-list-fetch';
import { fileValidate } from '../../utils/fileValidate';

const fileUploadReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        loading: false,
        success: true,
        error: null
      };

    case 'error':
      return {
        loading: false,
        success: false,
        error: action.payload
      };

    case 'loading':
      return {
        success: false,
        loading: true,
        error: null
      };

    case 'reset':
      return {
        error: null,
        loading: false,
        success: false
      };

    default:
      return state;
  }
};

const WordsUpload = ({ fetchWords }) => {
  const fileInput = useRef(null);
  const [files, setFiles] = useState(null);
  const [state, dispatch] = useReducer(fileUploadReducer, {
    error: null,
    loading: false,
    success: false
  });

  useEffect(() => {
    if (!files) {
      return;
    }
    if (!fileValidate(files, dispatch)) {
      return;
    }

    xlsFileUpload(files).then(wordsList => {
      axios
        .post('/api/putManyData', wordsList)
        .then(() => {
          dispatch({ type: 'success' });
          fetchWords();
        })
        .catch(err => {
          dispatch({ type: 'error', payload: err.message });
        });
    });
  }, [files]);

  const handleFileDrop = monitor => {
    if (monitor) {
      const { files } = monitor.getItem();
      setFiles(files);
    }
  };

  const handleFile = () => {
    const { files } = fileInput.current;

    setFiles(files);
  };

  const { error, success, loading } = state;

  return (
    <TargetBox
      onDrop={handleFileDrop}
      error={error}
      isSuccess={success}
      isLoading={loading}
      onResetForm={() => dispatch({ type: 'reset' })}
      handleFile={handleFile}
      fileInput={fileInput}
    />
  );
};

export default connect(
  null,
  { fetchWords }
)(WordsUpload);
