import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/Nav';
import Main from '../main/Main';
import { preloadImages } from '../../data/preload-images';
import { allWordsDelete } from '../../actions/word-list-remove';
import '../../scss/app.scss';

const Layout = ({ allWordsDelete, children }) => {
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
      <Nav isActive={navShow} allWordsDelete={allWordsDelete} />

      <Main navToggle={navToggle} navShow={navShow}>
        {children}
      </Main>
    </div>
  );
};

export default connect(null, { allWordsDelete })(Layout);
