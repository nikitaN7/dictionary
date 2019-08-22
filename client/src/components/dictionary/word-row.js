import React, { Component, Fragment } from 'react';

const WordRow = (props) => {
  const { id, ru, en, bookmarks } = props.data;
  const isTenCell = (props.idx + 1) % 10 === 0 && props.idx > 0;

  return (
    <Fragment>
      <tr>
        <td
          onClick={(e) => props.onWordClick(id, props.enClass)}
          className={props.enClass}>{en}
        </td>

        <td
          onClick={(e) => props.onWordClick(id, props.ruClass)}
          className={props.ruClass}>{ru}
        </td>

        <td>
          <span onClick={(e) => props.onActionClick(id, 'update')}>
            <img src="../../img/notepad-update.svg" alt=""/>
          </span>

          <span onClick={(e) => props.onActionClick(id, 'delete')}>
            <img src="../../img/notepad-minus.svg" alt=""/>
          </span>
        </td>

        <td>
          {bookmarks
            ? <img src="../../img/lace-star.svg" alt=""/>
            : null}
        </td>
      </tr>

      {isTenCell
        ? <tr className="pink"><td colSpan="4" className="text-center">{(props.idx + 1) / 10} column end</td></tr>
        : null
      }

    </Fragment>
  )
}

export default WordRow;