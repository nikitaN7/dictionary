import React from 'react';
import Dictionary from '../dictionary';
import Header from '../header';

const Main = props => {
  const { navShow, navToggle, onActionClick } = props;

  return (
    <main className="main">
      <Header
        navShow={navShow}
        navToggle={navToggle}
        onActionClick={onActionClick}
      />
      <Dictionary onActionClick={onActionClick} />
    </main>
  );
};

export default Main;
