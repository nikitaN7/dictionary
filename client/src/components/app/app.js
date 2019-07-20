import React, { Component } from 'react';
import Nav from '../nav';
import '../../scss/app.scss';

class App extends Component {

  state = {
    navIsActive: true
  }

  render() {
    return (
      <div className="container">
        <Nav isActive={this.state.navIsActive} />
      </div>
    )
  }
}

export default App;