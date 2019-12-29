import React from 'react';

const ScrollField = ({ handleTableScroll, tableScrollIdx }) => {
  return (
    <div className="dictionary__scroll">
      <input
        type="text"
        placeholder="Enter col number"
        value={tableScrollIdx}
        onChange={e => handleTableScroll(e.target.value)}
      />

      <button href="#" className="dictionary__scroll__anchor">
        Scroll
      </button>
    </div>
  );
};

export default ScrollField;
