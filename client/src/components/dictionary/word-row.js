import React, { Component, Fragment } from 'react';
import { Element } from 'react-scroll';

const WordRow = (props) => {
  const { id, ru, en, bookmarks } = props.data;
  const isTenCell = props.index % 10 === 0 || props.index === 0;
  const cellId = (props.index / 10) + 1;

  return (
    <Fragment>
      {isTenCell
        ? <tr className="transparent">
            <td colSpan="4" className="text-center">
              <Element name={cellId + '-col'}>
                {cellId} words column
              </Element>
            </td>
          </tr>
        : null
      }

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

    </Fragment>
  )
}

export default WordRow;