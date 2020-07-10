import React from 'react';

type Props = {
  onClick(): void;
  text: string;
  icon: string;
  bgColor: string;
  activeClass: string;
};

const DropdownSelect: React.FC<Props> = props => {
  const { onClick, activeClass, text, bgColor, icon } = props;

  return (
    <div
      onClick={onClick}
      role="button"
      // tabIndex="0"
      className={`dictionary__options__item ${bgColor} ${activeClass}`}
    >
      <img src={`/img/${icon}`} alt="" />
      <span>{text}</span>
    </div>
  );
};

export default DropdownSelect;
