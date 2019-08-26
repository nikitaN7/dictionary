import React from 'react';

const WordsFilter = (props) => {
  return (
    <div className="filter">
      <button className="filter__btn">
        <span>Filter</span>
        <img src="/img/filter-icon.svg" alt=""/>
      </button>

      <div className="filter__dropdown">
        <label className="filter__item">
          <input type="radio" name="dictionary-filter"
            onChange={() => this.onFilterChange('all-words')}
            checked={props.filterType === 'all-words'} />
          <div className="filter__item__text">All words</div>
        </label>

        <label className="filter__item">
          <input type="radio" name="dictionary-filter"
            onChange={() => this.onFilterChange('hard-words')}
            checked={props.filterType === 'hard-words'} />
          <div className="filter__item__text">Hard words</div>
        </label>
      </div>
    </div>
  )
}

export default WordsFilter;