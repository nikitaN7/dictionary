import React, { useState } from 'react';
import Dictionary from '../dictionary';
import Header from '../header';

const Main = ({
  navShow,
  navToggle,
  onActionClick,
  handleTableScroll,
  tableScrollIdx
}) => {
  return (
    <main className="main">
      <Header
        navShow={navShow}
        navToggle={navToggle}
        onActionClick={onActionClick}
      />
      <Dictionary
        onActionClick={onActionClick}
        handleTableScroll={handleTableScroll}
        tableScrollIdx={tableScrollIdx}
      />
    </main>
  );
};

export default Main;
