import React, { Component } from 'react';
import Nav from '../nav';
import Main from '../main';
import Modal from '../modal';
import '../../scss/app.scss';

class App extends Component {

  state = {
    navIsActive: false,
    modalIsOpen: false,
    wordId: null,
    wordAction: ''
  }

  navToggle = () => {
    this.setState({
      navIsActive: !this.state.navIsActive
    })
  }

  modalClose = () => this.setState({modalIsOpen: false})

  onTableClick = (id, action) => {
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
          onTableClick={this.onTableClick} />

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