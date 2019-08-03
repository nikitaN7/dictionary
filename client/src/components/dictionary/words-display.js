import React, { Component } from 'react';

class WordsDisplay extends Component {

  state = {
    isToggleOn: false
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    const { isToggleOn } = this.state;

    return (
      <div className="dictionary__options">
        <div onClick={this.handleClick} className={`dictionary__options__item blue ${isToggleOn ? 'is-open' : 'is-close'}`}>
          <img src="/img/hide-eye.svg" alt=""/>
          <span>Hide words</span>
        </div>

        {isToggleOn ? (<ul className="dictionary__dropdown">
          <li className="dictionary__options__item white active">
            <img src="/img/show-eye.svg" alt=""/>
            <span>Show all words</span>
          </li>

          <li className="dictionary__options__item white">
            <img src="/img/en-icon.svg" alt=""/>
            <span>Hide en words</span>
          </li>

          <li className="dictionary__options__item white">
            <img src="/img/ru-icon.svg" alt=""/>
            <span>Hide ru words</span>
          </li>
        </ul>) : null }
      </div>
    )
  }
}

export default WordsDisplay;