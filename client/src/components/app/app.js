import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav';
import Main from '../main';
import Modal from '../modal';
import { preloadImages } from '../../data/preload-images';
import { allWordsDelete } from '../../actions/word-list-remove';
import '../../scss/app.scss';

class App extends Component {
  state = {
    navIsOpen: false,
    modalIsOpen: false,
    wordId: null,
    wordAction: ''
  };

  componentDidMount() {
    preloadImages.forEach(picture => {
      new Image().src = picture.fileName;
    });
  }

  navToggle = () => {
    const { navIsOpen } = this.state;
    this.setState({ navIsOpen: !navIsOpen });
  };

  modalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  onActionClick = (id, action) => {
    this.setState({
      modalIsOpen: true,
      wordId: id,
      wordAction: action
    });
  };

  render() {
    const { navIsOpen, modalIsOpen, wordId, wordAction } = this.state;
    const { allWordsDelete } = this.props;

    return (
      <div className="container">
        <Nav isActive={navIsOpen} allWordsDelete={allWordsDelete} />

        <Main
          navToggle={this.navToggle}
          navIsOpen={navIsOpen}
          onActionClick={this.onActionClick}
        />

        <Modal
          modalClose={this.modalClose}
          isOpen={modalIsOpen}
          wordId={wordId}
          wordAction={wordAction}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { allWordsDelete }
)(App);
