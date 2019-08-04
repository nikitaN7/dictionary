import React, { Component } from 'react';
import { SHOW_ALL_WORDS, HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';

const options = [
  {name: SHOW_ALL_WORDS, icon: 'show-eye', text: 'Show all words'},
  {name: HIDE_EN_WORDS, icon: 'en-icon', text: 'Hide en words'},
  {name: HIDE_RU_WORDS, icon: 'ru-icon', text: 'Hide ru words'}
]

class WordsDisplay extends Component {

  state = {
    isToggleOn: false
  }

  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.wordDisplay !== this.props.wordDisplay) {
      this.handleClick();
    }
  }

  render() {
    const { isToggleOn } = this.state;
    const { optionClick, wordDisplay } = this.props;

    return (
      <div className="dictionary__options">
        <div onClick={this.handleClick} className={`dictionary__options__item blue ${isToggleOn ? 'is-open' : 'is-close'}`}>
          <img src="/img/hide-eye.svg" alt=""/>
          <span>Hide words</span>
        </div>

        {isToggleOn ? (<ul className="dictionary__dropdown">

          {options.map((item, idx) => {
            return (
              <li key={idx} onClick={(e) => optionClick(item.name)}
                  className={`dictionary__options__item white ${wordDisplay === item.name ? 'active': ''}`}>
                <img src={`/img/${item.icon}.svg`} alt=""/>
                <span>{item.text}</span>
              </li>
            )
          })}

        </ul>) : null }
      </div>
    )
  }
}

export default WordsDisplay;