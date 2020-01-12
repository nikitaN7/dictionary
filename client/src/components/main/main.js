import React from 'react';
import Dictionary from '../dictionary';
import Header from '../header';

const Main = ({ navShow, navToggle }) => {
  return (
    <main className="main">
      <Header navShow={navShow} navToggle={navToggle} />

      <Dictionary />
    </main>
  );
};

export default Main;
