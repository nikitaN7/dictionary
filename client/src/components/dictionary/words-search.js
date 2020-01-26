import React from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';

const WordsSearch = props => {
  const { searchValue } = props;
  return (
    <div className="search search--grow">
      <div className="search__group search__group--md">
        <input
          name="filterSearch"
          type="text"
          placeholder="Search"
          onChange={({ target }) =>
            props.handleChange(target.name, target.value)
          }
          value={searchValue}
        />
        <button className="search__btn">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default WordsSearch;
