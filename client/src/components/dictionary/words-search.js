import React from 'react';

const WordsSearch = (props) => {
  return (
    <div class="search">
      <div className="search__group">
        <input onChange={props.handleChange} value={props.searchValue} name="searchValue" type="text" placeholder="Search" />
      </div>
    </div>
  )
}

export default WordsSearch;