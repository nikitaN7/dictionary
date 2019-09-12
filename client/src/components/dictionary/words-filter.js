import React, { Component } from 'react';

const filterTypes = [
  { type: 'all-words', text: 'All words' },
  { type: 'hard-words', text: 'Hard words' }
]

class WordsFilter extends Component {
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
    const { filterType, handleChange } = this.props;

    return (
      <div className="filter">
        <button className="filter__btn" onClick={this.handleClick}>
          <span>Filter</span>
          <img src="/img/filter-icon.svg" alt=""/>
        </button>

        {isToggleOn ? (
          <div className="filter__dropdown">
            {filterTypes.map((item, idx) => {
              return (
                <label key={idx} className="filter__item">
                  <input type="radio" name="filterType"
                    onChange={({ target }) => handleChange(target.name, item.type)}
                    checked={filterType === item.type} />
                  <div className="filter__item__text">{item.text}</div>
                </label>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }
}

export default WordsFilter;