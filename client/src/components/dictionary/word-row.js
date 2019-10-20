import React from 'react';
import { Element } from 'react-scroll';

const WordRow = props => {
  const { data, index, onActionClick, onWordClick, enClass, ruClass } = props;
  const { id, ru, en, bookmarks } = data;
  const isTenCell = index % 10 === 0 || index === 0;
  const cellId = index / 10 + 1;

  return (
    <>
      {isTenCell ? (
        <tr className="transparent">
          <td colSpan="4" className="text-center">
            <Element name={`${cellId}-col`}>{cellId} words column</Element>
          </td>
        </tr>
      ) : null}

      <tr>
        <td onClick={e => onWordClick(id, enClass)} className={enClass}>
          {en}
        </td>

        <td onClick={e => onWordClick(id, ruClass)} className={ruClass}>
          {ru}
        </td>

        <td>
          <span onClick={e => onActionClick(id, 'update')}>
            <img src="../../img/notepad-update.svg" alt="" />
          </span>

          <span onClick={e => onActionClick(id, 'delete')}>
            <img src="../../img/notepad-minus.svg" alt="" />
          </span>
        </td>

        <td>
          {bookmarks ? <img src="../../img/lace-star.svg" alt="" /> : null}
        </td>
      </tr>
    </>
  );
};

export default WordRow;
