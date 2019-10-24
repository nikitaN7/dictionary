import React from 'react';

const DropdownSelect = props => {
  const { onClick, activeClass, text, bgColor, icon } = props;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex="0"
      className={`dictionary__options__item ${bgColor} ${activeClass}`}
    >
      <img src={`/img/${icon}`} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default DropdownSelect;
