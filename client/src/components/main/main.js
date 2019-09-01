import React, { Component } from 'react';
import Dictionary from '../dictionary/';

class Main extends Component {

  render() {
    const { navIsActive, navToggle, onActionClick } = this.props;
    return (
      <main className="main">
        <div className="header">
          <button className={`header__burger ${navIsActive ? 'is-open' : ''}`} onClick={navToggle}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <button className="btn btn--lg btn--add" onClick={(e) => onActionClick(null, 'add')}>
            Add word
          </button>
        </div>

        <Dictionary onActionClick={onActionClick} />
      </main>
    )
  }
}

export default Main;