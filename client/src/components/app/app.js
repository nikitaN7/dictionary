import React, { Component } from 'react';
import Nav from '../nav';
import Main from '../main';
import '../../scss/app.scss';

class App extends Component {

  state = {
    navIsActive: false
  }

  navToggle = () => {
    this.setState({
      navIsActive: !this.state.navIsActive
    })
  }

  render() {
    const { navIsActive } = this.state;

    return (
      <div className="container">
        <Nav isActive={navIsActive} />
        <Main navToggle={this.navToggle} navIsActive={navIsActive} />
      </div>
    )
  }
}

export default App;