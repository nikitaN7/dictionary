import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import css from './scss/no-words.module.scss';

type Props = {};

const WordsTrainerNoWords: React.FC<Props> = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.image}>
        <FaBook />
      </div>
      <span className={css.title}>Not enough words!</span>
      <p className={css.text}>
        To start repetition you should add to the dictionary at least 4 words.
      </p>
      <NavLink to="/dictionary" exact activeClassName="active">
        <button className={css.button}>Go to the dictionary</button>
      </NavLink>
    </div>
  );
};

export default WordsTrainerNoWords;
