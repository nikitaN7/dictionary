import React, { Component, Fragment } from 'react';

class Main extends Component {

  render() {
    const { navIsActive, navToggle } = this.props;
    return (
      <main className="main">
        <div className="header">
          <button className={`header__burger ${navIsActive ? 'is-open' : ''}`} onClick={navToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </main>
    )
  }
}

export default Main;