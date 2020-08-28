import React, { useState, useEffect } from 'react';
import Nav from '../nav/Nav';
import Main from '../main/Main';
import { preloadImages } from '../../data/preload-images';
import '../../scss/app.scss';

import { fetchWords } from '../../actions/word-list-fetch';
import { useDispatch } from 'react-redux';

type Props = {};

const Layout: React.FC<Props> = ({ children }) => {
  const [navShow, setNavShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    preloadImages.forEach(picture => {
      new Image().src = picture.fileName;
    });
  }, []);

  useEffect(() => {
    dispatch(fetchWords());
  }, [fetchWords]);

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
