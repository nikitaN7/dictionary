import React from 'react';
import css from '../scss/jumble-letters.module.scss';
import classNames from 'classnames/bind';

const JumbleLettersList = () => {
  return (
    <div className={css.list}>
      <div className={css.letters}>
        <div className={classNames(css.lettersItem, css.empty)}></div>
        <div className={classNames(css.lettersItem)}>S</div>
        <div className={classNames(css.lettersItem, css.success)}>U</div>
        <div className={classNames(css.lettersItem, css.success)}>U</div>
        <div className={classNames(css.lettersItem, css.error)}></div>
        <div className={classNames(css.lettersItem, css.error)}></div>
        <div className={classNames(css.lettersItem, css.error)}></div>
      </div>
    </div>
  );
};

export default JumbleLettersList;
