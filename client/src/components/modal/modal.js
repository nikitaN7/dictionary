import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ModalInner from './modal-inner';
import { getWordById } from '../../function/getWordById';
import {
  wordUpdate,
  wordDelete,
  wordAdd
} from '../../actions/word-list-update';

const initialNewWord = {
  en: '',
  ru: '',
  bookmarks: false
};

class Modal extends Component {
  state = {
    newWord: { ...initialNewWord }
  };

  componentDidUpdate(previousProps) {
    const { word } = this.props;
    const { newWord } = this.state;

    if (previousProps.word.id !== word.id) {
      this.resetState();

      if (Object.keys(word).length > 0) {
        Object.keys(newWord).forEach(key => {
          newWord[key] = word[key];
        });

        this.setState({ newWord });
      }
    }
  }

  resetState = () => {
    this.setState({
      newWord: { ...initialNewWord }
    });
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      newWord: {
        ...prevState.newWord,
        [target.name]: value
      }
    }));
  };

  onSubmit = action => {
    if (action === 'update') {
      this.props.wordUpdate(
        this.props.word,
        this.state.newWord,
        this.props.modalClose
      );
    }

    if (action === 'add') {
      this.props.wordAdd(
        this.state.newWord,
        this.props.modalClose,
        this.resetState
      );
    }

    if (action === 'delete') {
      this.props.wordDelete(this.props.word, this.props.modalClose);
    }
  };

  render() {
    return ReactDOM.createPortal(
      this.props.isOpen ? (
        <ModalInner
          {...this.props}
          onSubmit={this.onSubmit}
          newWord={this.state.newWord}
          handleChange={this.handleChange}
        />
      ) : null,
      document.querySelector('#modal-root')
    );
  }
}

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
