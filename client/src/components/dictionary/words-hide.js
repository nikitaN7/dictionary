import React, { Component } from 'react';
import DropdownSelect from './dropdown-select';
import * as constants from '../../constants';

const options = [
  { value: '', icon: 'show-eye', text: 'Show all words' },
  { value: constants.HIDE_EN_WORDS, icon: 'en-icon', text: 'Hide en words' },
  { value: constants.HIDE_RU_WORDS, icon: 'ru-icon', text: 'Hide ru words' }
];

class WordsHide extends Component {
  state = {
    isToggleOn: false
  };

  componentDidUpdate(previousProps) {
    const { hiddenWords } = this.props;
    if (previousProps.hiddenWords !== hiddenWords) {
      this.toggleOptions();
    }
  }

  toggleOptions = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  };

  renderDropdown() {
    const { setHiddenWords, hiddenWords } = this.props;

    return (
      <ul className="dictionary__dropdown">
        {options.map((item, idx) => {
          const isItemActive = hiddenWords === item.value ? 'active' : '';

          return (
            <li
              key={idx}
              onClick={() => setHiddenWords(item.value)}
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
    const activeClass = isToggleOn ? 'is-open' : 'is-close';

    return (
      <div className="dictionary__options">
        <DropdownSelect
          onClick={this.toggleOptions}
          activeClass={activeClass}
          bgColor="blue"
          icon="hide-eye.svg"
          text="Hide words"
        />

        {isToggleOn ? this.renderDropdown() : null}
      </div>
    );
  }
}

export default WordsHide;
