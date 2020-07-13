import React from 'react';
import Header from '../header/Header';

const Main = ({ navShow, navToggle, children }) => {
  return (
    <main className="main">
      <Header navShow={navShow} navToggle={navToggle} />
      {children}
    </main>
  );
};

export default Main;
