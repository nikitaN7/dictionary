import React from 'react';
import AppRoutes from '../../routes/AppRoutes';
import Header from '../header';

const Main = ({ navShow, navToggle }) => {
  return (
    <main className="main">
      <Header navShow={navShow} navToggle={navToggle} />
      <AppRoutes />
    </main>
  );
};

export default Main;
