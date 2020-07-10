import React from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';

type Props = {
  searchValue: string;
  handleChange(name: string, value: string): void;
};

const WordsSearch: React.FC<Props> = ({ searchValue, handleChange }) => {
  return (
    <div className="search search--grow">
      <div className="search__group search__group--md">
        <input
          name="filterSearch"
          type="text"
          placeholder="Search"
          onChange={({ target }) => handleChange(target.name, target.value)}
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
