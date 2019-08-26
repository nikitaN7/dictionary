import React, { Component } from 'react';

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

    return (
      <div className="filter">
        <button className="filter__btn" onClick={this.handleClick}>
          <span>Filter</span>
          <img src="/img/filter-icon.svg" alt=""/>
        </button>

        {isToggleOn ? (
          <div className="filter__dropdown">
            <label className="filter__item">
              <input type="radio" name="dictionary-filter"
                onChange={() => this.props.onFilterChange('all-words')}
                checked={this.props.filterType === 'all-words'} />
              <div className="filter__item__text">All words</div>
            </label>

            <label className="filter__item">
              <input type="radio" name="dictionary-filter"
                onChange={() => this.props.onFilterChange('hard-words')}
                checked={this.props.filterType === 'hard-words'} />
              <div className="filter__item__text">Hard words</div>
            </label>
          </div>
        ) : null}
      </div>
    )
  }
}

export default WordsFilter;