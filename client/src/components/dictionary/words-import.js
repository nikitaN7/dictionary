import React from 'react';

const WordsImport = props => {
  const { isActive, handleClick } = props;
  const activeClass = isActive ? 'is-open' : 'is-close';

  return (
    <div className="dictionary__options">
      <div
        onClick={handleClick}
        role="button"
        tabIndex="0"
        className={`dictionary__options__item green ${activeClass}`}
      >
        <img src="/img/import-icon.svg" alt="" />
        <span>Import words</span>
      </div>
    </div>
  );
};

export default WordsImport;
