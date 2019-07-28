import React, { Component } from 'react';
import Nav from '../nav';
import Main from '../main';
import Modal from '../modal';
import '../../scss/app.scss';

class App extends Component {

  state = {
    navIsActive: false,
    modalIsOpen: false
  }

  navToggle = () => {
    this.setState({
      navIsActive: !this.state.navIsActive
    })
  }

  modalOpen = () => this.setState({modalIsOpen: true})
  modalClose = () => this.setState({modalIsOpen: false})

  render() {
    const { navIsActive, modalIsOpen } = this.state;

    return (
      <div className="container">
        <Nav isActive={navIsActive} />
        <Main navToggle={this.navToggle} navIsActive={navIsActive} />
        <Modal modalClose={this.modalClose} isOpen={modalIsOpen} />
      </div>
    )
  }
}

export default App;