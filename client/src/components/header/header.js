import React from 'react';

const Header = props => {
  const { navIsOpen, navToggle, onActionClick } = props;

  return (
    <div className="header">
      <button
        className={`header__burger ${navIsOpen ? 'is-open' : ''}`}
        type="button"
        onClick={navToggle}
      >
        <span />
        <span />
        <span />
      </button>

      <button
        type="button"
        className="btn btn--lg btn--add"
        onClick={() => onActionClick(null, 'add')}
      >
        Add word
      </button>
    </div>
  );
};

export default Header;
