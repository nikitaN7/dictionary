import React from 'react';
import css from '../scss/jumble-letters.module.scss';
import classNames from 'classnames/bind';

const getIdxExcludeSpaces = (word, idx) => {
  const slicedWord = word.slice(0, idx);
  const lengthWithSpaces = slicedWord.split('').length;
  const lengthExcludeSpaces = slicedWord.replace(/\s/g, '').split('').length;
  const lengthDifference = lengthWithSpaces - lengthExcludeSpaces;

  return idx - lengthDifference;
};

const JumbleLettersBlock = ({ word, letters, hasError }) => {
  const renderLetter = (letter, idx) => {
    if (letter.trim() === '') {
      return <div className={css.spaceBlock} />;
    }

    const letterIdx = getIdxExcludeSpaces(word, idx);
    const isEntered = !!letters[letterIdx];

    if (isEntered) {
      return (
        <div className={classNames(css.lettersItem, css.success)}>{letter}</div>
      );
    }

    if (hasError && letterIdx === letters.length) {
      return <div className={classNames(css.lettersItem, css.error)} />;
    }

    return <div className={classNames(css.lettersItem, css.empty)} />;
  };

  return (
    <div className={css.block}>
      <div className={css.letters}>
        {word.split('').map((letter, idx) => {
          return renderLetter(letter, idx);
        })}
      </div>
    </div>
  );
};

export default JumbleLettersBlock;
