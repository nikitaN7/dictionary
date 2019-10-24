import React from 'react';
import DropdownSelect from './dropdown-select';

const WordsUploadDropdown = props => {
  const { isActive, handleClick } = props;
  const activeClass = isActive ? 'is-open' : 'is-close';

  return (
    <div className="dictionary__options">
      <DropdownSelect
        onClick={handleClick}
        activeClass={activeClass}
        bgColor="green"
        icon="import-icon.svg"
        text="Import words"
      />
    </div>
  );
};

export default WordsUploadDropdown;
