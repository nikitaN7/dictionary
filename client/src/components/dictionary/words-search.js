import React from 'react';

const WordsSearch = (props) => {
  return (
    <div className="search">
      <div className="search__group">
        <input onChange={({ target }) => props.handleChange(target.name, target.value)} value={props.searchValue} name="searchValue" type="text" placeholder="Search" />
      </div>
    </div>
  )
}

export default WordsSearch;