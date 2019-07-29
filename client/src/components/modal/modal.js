import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ModalInner from './modal-inner';
import { getWordById } from '../../function/getWordById';
import { connect } from 'react-redux'

class Modal extends Component {

  state = {
    newWord: {
      en: '',
      ru: '',
      bookmarks: ''
    }
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

  onSubmit = () => {
    console.log('')
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
  null
)(Modal);