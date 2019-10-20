import React, { Component } from 'react';
import * as constants from '../../constants';

const options = [
  { name: constants.SHOW_ALL_WORDS, icon: 'show-eye', text: 'Show all words' },
  { name: constants.HIDE_EN_WORDS, icon: 'en-icon', text: 'Hide en words' },
  { name: constants.HIDE_RU_WORDS, icon: 'ru-icon', text: 'Hide ru words' }
];

class WordsDisplay extends Component {
  state = {
    isToggleOn: false
  };

  componentDidUpdate(previousProps) {
    const { wordDisplay } = this.props;
    if (previousProps.wordDisplay !== wordDisplay) {
      this.handleClick();
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  renderDropdown() {
    const { optionClick, wordDisplay } = this.props;

    return (
      <ul className="dictionary__dropdown">
        {options.map((item, idx) => {
          const isItemActive = wordDisplay === item.name ? 'active' : '';

          return (
            <li
              key={idx}
              onClick={() => optionClick(item.name)}
              className={`dictionary__options__item white ${isItemActive}`}
            >
              <img src={`/img/${item.icon}.svg`} alt="" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const { isToggleOn } = this.state;
    const toggleClass = isToggleOn ? 'is-open' : 'is-close';

    return (
      <div className="dictionary__options">
        <div
          onClick={this.handleClick}
          role="button"
          tabIndex="0"
          className={`dictionary__options__item blue ${toggleClass}`}
        >
          <img src="/img/hide-eye.svg" alt="" />
          <span>Hide words</span>
        </div>

        {isToggleOn ? this.renderDropdown() : null}
      </div>
    );
  }
}

export default WordsDisplay;
