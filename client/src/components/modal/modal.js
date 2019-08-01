import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ModalInner from './modal-inner';
import { getWordById } from '../../function/getWordById';
import { wordUpdate, wordDelete, wordAdd } from '../../actions';
import { connect } from 'react-redux';

const initialNewWord = {
  en: '',
  ru: '',
  bookmarks: false
}

class Modal extends Component {

  state = {
    newWord: initialNewWord
  }

  resetNewWordState() {
    this.setState({newWord: {...initialNewWord}});
  }

  handleChange = ({target}) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      newWord: {
        ...this.state.newWord,
       [target.name]: value
      }
    })
  }

  componentDidUpdate(previousProps, previousState) {
    const word = this.props.word;
    const newWord = this.state.newWord;

    if (previousProps.word !== word) {
      this.resetNewWordState();

      if (Object.keys(word).length > 0) {

        Object.keys(newWord).forEach((key) => {
          newWord[key] = word[key];
        })

        this.setState({newWord})
      }
    }
  }

  onSubmit = (action) => {

    if (action == 'update') {
      this.props.wordUpdate(this.props.word, this.state.newWord);
      this.props.modalClose();
    }

    if (action == 'add') {
      this.props.wordAdd(this.state.newWord);
      this.props.modalClose();
    }

    if (action == 'delete') {
      this.props.wordDelete(this.props.word);
      this.props.modalClose();
    }
  }

  render() {
    return ReactDOM
      .createPortal(
        this.props.isOpen
          ? <ModalInner { ...this.props } onSubmit={this.onSubmit} newWord={this.state.newWord} handleChange={this.handleChange} />
          : null,
        document.querySelector("#modal-root")
      );
  }
}

const mapStateToProps = ({wordList}, ownProps) => {
  return {
    word: getWordById(wordList.words, ownProps.wordId)
  }
}

export default connect(
  mapStateToProps,
  { wordAdd, wordDelete, wordUpdate }
)(Modal);