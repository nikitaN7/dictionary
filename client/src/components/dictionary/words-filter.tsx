import React, { useState } from 'react';
import FilterIcon from '../../assets/icons/FilterIcon';

const filterTypes = [
  { type: 'all-words', text: 'All words' },
  { type: 'hard-words', text: 'Hard words' }
];

type Props = {
  filterType: string;
  handleChange(name: string, type: string): void;
};

const WordsFilter: React.FC<Props> = ({ filterType, handleChange }) => {
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div className="filter">
      <button
        type="button"
        className="filter__btn"
        onClick={() => setFilterShow(filterShow => !filterShow)}
      >
        <FilterIcon />
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
