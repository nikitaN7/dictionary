import React from 'react';

const Header = props => {
  const { navShow, navToggle, onActionClick } = props;

  return (
    <div className="header">
      <button
        className={`header__burger ${navShow ? 'is-open' : ''}`}
        type="button"
        onClick={navToggle}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};

export default Header;
