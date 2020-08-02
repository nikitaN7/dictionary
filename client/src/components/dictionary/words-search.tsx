import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

type Props = {
  searchValue: string;
  handleChange(name: string, value: string): void;
};

const WordsSearch: React.FC<Props> = ({ searchValue, handleChange }) => {
  const handleClick = () => {
    if (searchValue) {
      handleChange('filterSearch', '');
    }
  };

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
        <button className="search__btn" onClick={handleClick}>
          {!searchValue ? <FaSearch /> : <FaTimes />}
        </button>
      </div>
    </div>
  );
};

export default WordsSearch;
