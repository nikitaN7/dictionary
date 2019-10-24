import React from 'react';
import Dictionary from '../dictionary';

const Main = props => {
  const { navIsOpen, navToggle, onActionClick } = props;

  return (
    <main className="main">
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

      <Dictionary onActionClick={onActionClick} />
    </main>
  );
};

export default Main;
