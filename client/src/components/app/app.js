import React, { Component } from 'react';
import Nav from '../nav';
import Main from '../main';
import Modal from '../modal';
import '../../scss/app.scss';

const preloadImages = [
  {fileName: '/img/warning.svg'},
  {fileName: '/img/sm-loader.svg'}
]

class App extends Component {

  state = {
    navIsActive: false,
    modalIsOpen: false,
    wordId: null,
    wordAction: ''
  }

  componentDidMount() {
    preloadImages.forEach((picture) => {
      new Image().src = picture.fileName;
    });
}

  navToggle = () => {
    this.setState({navIsActive: !this.state.navIsActive})
  }

  modalClose = () => {
    this.setState({modalIsOpen: false})
  }

  onActionClick = (id, action) => {
    this.setState({
      modalIsOpen: true,
      wordId: id,
      wordAction: action
    })
  }

  render() {
    const { navIsActive, modalIsOpen, wordId, wordAction } = this.state;

    return (
      <div className="container">
        <Nav isActive={navIsActive} />

        <Main
          navToggle={this.navToggle}
          navIsActive={navIsActive}
          onActionClick={this.onActionClick} />

        <Modal
          modalClose={this.modalClose}
          isOpen={modalIsOpen}
          wordId={wordId}
          wordAction={wordAction} />
      </div>
    )
  }
}

export default App;