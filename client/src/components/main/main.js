import React from 'react';
import Dictionary from '../dictionary';
import Header from '../header';

const Main = props => {
  const { navIsOpen, navToggle, onActionClick } = props;

  return (
    <main className="main">
      <Header
        navIsOpen={navIsOpen}
        navToggle={navToggle}
        onActionClick={onActionClick}
      />
      <Dictionary onActionClick={onActionClick} />
    </main>
  );
};

export default Main;
