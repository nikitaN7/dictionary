import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModalInner from './modal-inner';
import { getWordById } from '../../utils/getWordById';
import {
  wordUpdate,
  wordDelete,
  wordAdd
} from '../../actions/word-list-update';

const initialNewWord = {
  en: '',
  ru: '',
  bookmarks: false,
  transcription: '',
  association: '',
  enExample: '',
  ruExample: ''
};

const Modal = props => {
  const [newWord, setNewWord] = useState({ ...initialNewWord });

  const resetState = () => {
    const copy = { ...initialNewWord };
    setNewWord(copy);
  };

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setNewWord(prevState => {
      return {
        ...prevState,
        [target.name]: value
      };
    });
  };

  const onSubmit = action => {
    if (action === 'update') {
      props.wordUpdate(props.word, newWord, props.modalClose);
    }

    if (action === 'add') {
      props.wordAdd(
        newWord,
        props.modalClose,
        resetState,
        props.setTableScrollIdx
      );
    }

    if (action === 'delete') {
      props.wordDelete(props.word, props.modalClose);
    }
  };
  useEffect(() => {
    const word = { ...newWord };

    resetState();

    if (Object.keys(props.word).length > 0) {
      Object.keys(word).forEach(key => {
        if (key === 'ruExample') {
          const value =
            (props.word.examples && props.word.examples.ru) ||
            initialNewWord.ruExample;
          word.ruExample = value;
          return;
        }

        if (key === 'enExample') {
          const value =
            (props.word.examples && props.word.examples.en) ||
            initialNewWord.enExample;
          word.enExample = value;
          return;
        }

        const value = props.word[key] || initialNewWord[key];
        word[key] = value;
      });

      setNewWord({ ...word });
    }
  }, [props.word.id]);

  return ReactDOM.createPortal(
    props.isOpen ? (
      <ModalInner
        {...props}
        onSubmit={onSubmit}
        newWord={newWord}
        handleChange={handleChange}
      />
    ) : null,
    document.querySelector('#modal-root')
  );
};

const mapStateToProps = ({ wordList }, ownProps) => {
  return {
    word: getWordById(wordList.words, ownProps.wordId),
    error: wordList.error,
    pending: wordList.pending
  };
};

export default connect(
  mapStateToProps,
  { wordAdd, wordDelete, wordUpdate }
)(Modal);
