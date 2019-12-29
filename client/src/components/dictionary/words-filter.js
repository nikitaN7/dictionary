import React, { useState } from 'react';

const filterTypes = [
  { type: 'all-words', text: 'All words' },
  { type: 'hard-words', text: 'Hard words' }
];

const WordsFilter = ({ filterType, handleChange }) => {
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div className="filter">
      <button
        type="button"
        className="filter__btn"
        onClick={() => setFilterShow(filterShow => !filterShow)}
      >
        <span>Filter</span>
        <img src="/img/filter-icon.svg" alt="" />
      </button>

      {filterShow ? (
        <div className="filter__dropdown">
          {filterTypes.map((item, idx) => {
            return (
              <label key={idx} className="filter__item">
                <input
                  type="radio"
                  name="filterType"
                  onChange={({ target }) =>
                    handleChange(target.name, item.type)
                  }
                  checked={filterType === item.type}
                />
                <div className="filter__item__text">{item.text}</div>
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default WordsFilter;
