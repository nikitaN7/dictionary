import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav';
import Main from '../main';
import Modal from '../modal';
import { preloadImages } from '../../data/preload-images';
import { allWordsDelete } from '../../actions/word-list-remove';
import '../../scss/app.scss';

const App = props => {
  const [navShow, setNavShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [tableScrollIdx, setTableScrollIdx] = useState(0);

  const [word, setWord] = useState({
    id: null,
    action: ''
  });

  useEffect(() => {
    preloadImages.forEach(picture => {
      new Image().src = picture.fileName;
    });
  }, []);

  const navToggle = () => {
    setNavShow(navShow => !navShow);
  };

  const modalClose = () => {
    setModalShow(false);
  };

  const onActionClick = (id, action) => {
    setModalShow(true);
    setWord({ id, action });
  };

  const handleTableScroll = value => {
    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setTableScrollIdx(value);
    }
  };

  const { id, action } = word;
  const { allWordsDelete } = props;

  return (
    <div className="container">
      <Nav isActive={navShow} allWordsDelete={allWordsDelete} />

      <Main
        navToggle={navToggle}
        navShow={navShow}
        onActionClick={onActionClick}
        handleTableScroll={handleTableScroll}
        tableScrollIdx={tableScrollIdx}
      />

      <Modal
        modalClose={modalClose}
        isOpen={modalShow}
        wordId={id}
        wordAction={action}
        setTableScrollIdx={setTableScrollIdx}
      />
    </div>
  );
};

export default connect(
  null,
  { allWordsDelete }
)(App);
