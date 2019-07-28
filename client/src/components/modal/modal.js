import React, { Component } from 'react';
import ReactDOM from "react-dom";
import ModalInner from './modal-inner';
import { getWordById } from '../../function/getWordById';
import { connect } from 'react-redux'

class Modal extends Component {

  onSubmit = () => {
    console.log('')
  }

  render() {
    return ReactDOM
      .createPortal(
        this.props.isOpen
          ? <ModalInner { ...this.props } onSubmit={this.onSubmit} />
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