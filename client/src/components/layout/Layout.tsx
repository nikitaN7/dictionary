import React, { useState, useEffect } from 'react';
import Nav from '../nav/Nav';
import Main from '../main/Main';
import { preloadImages } from '../../data/preload-images';
import '../../scss/app.scss';

type Props = {};

const Layout: React.FC<Props> = ({ children }) => {
  const [navShow, setNavShow] = useState(false);

  useEffect(() => {
    preloadImages.forEach(picture => {
      new Image().src = picture.fileName;
    });
  }, []);

  const navToggle = () => {
    setNavShow(navShow => !navShow);
  };

  return (
    <div className="container">
      <Nav isActive={navShow} />

      <Main navToggle={navToggle} navShow={navShow}>
        {children}
      </Main>
    </div>
  );
};

export default Layout;
