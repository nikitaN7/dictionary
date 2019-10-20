import React from 'react';

const WordsSearch = props => {
  const { searchValue } = props;
  return (
    <div className="search">
      <div className="search__group">
        <input
          name="searchValue"
          type="text"
          placeholder="Search"
          onChange={({ target }) =>
            props.handleChange(target.name, target.value)
          }
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default WordsSearch;
