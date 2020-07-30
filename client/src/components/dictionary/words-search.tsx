import React from 'react';
import { FaSearch } from 'react-icons/fa';

type Props = {
  searchValue: string;
  handleChange(name: string, value: string): void;
};

const WordsSearch: React.FC<Props> = ({ searchValue, handleChange }) => {
  return (
    <div className="search">
      <div className="search__group search__group--md">
        <input
          name="filterSearch"
          type="text"
          placeholder="Search"
          onChange={({ target }) => handleChange(target.name, target.value)}
          value={searchValue}
        />
        <button className="search__btn">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default WordsSearch;
