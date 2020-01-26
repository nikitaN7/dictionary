import React from 'react';
import ArrowDownIcon from '../../assets/icons/ArrowDownIcon';

const ScrollField = ({ handleTableScroll, tableScrollIdx }) => {
  return (
    <div className="search">
      <div className="search__group search__group--sm">
        <input
          name="filterSearch"
          type="text"
          placeholder="Scroll to"
          onChange={e => handleTableScroll(e.target.value)}
          value={tableScrollIdx}
        />
        <button className="search__btn">
          <ArrowDownIcon />
        </button>
      </div>
    </div>
  );
};

export default ScrollField;
