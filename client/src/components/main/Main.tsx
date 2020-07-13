import React from 'react';
import Header from '../header/Header';

type Props = {
  navShow: boolean;
  navToggle(): void;
};

const Main: React.FC<Props> = ({ navShow, navToggle, children }) => {
  return (
    <main className="main">
      <Header navShow={navShow} navToggle={navToggle} />
      {children}
    </main>
  );
};

export default Main;
