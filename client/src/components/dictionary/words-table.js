import React, { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';
import WordRow from './word-row';
import Preloader from '../preloader';

const WordsTable = ({ hiddenWords, words, onActionClick, pending }) => {
  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    setVisibleWords([]);
  }, [hiddenWords]);

  const onWordClick = (id, className) => {
    if (!visibleWords.includes(id) && className === 'hide') {
      setVisibleWords(prevState => [...prevState, id]);
    }
  };

  const setClassName = (id, option) => {
    if (!visibleWords.includes(id) && hiddenWords === option) {
      return 'hide';
    }

    return '';
  };

  const renderRows = () => {
    return words.map((data, idx) => {
      return (
        <WordRow
          data={data}
          key={idx}
          onActionClick={onActionClick}
          onWordClick={onWordClick}
          index={idx}
          enClass={setClassName(data.id, HIDE_EN_WORDS)}
          ruClass={setClassName(data.id, HIDE_RU_WORDS)}
        />
      );
    });
  };

  const hasData = words.length > 0;
  const isLoading = pending && !hasData;

  return (
    <Element className="dictionary__table" id="dictionaryTable">
      <table>
        <thead>
          <tr className="blue">
            <th>EN</th>
            <th>RU</th>
            <th>Action</th>
            <th>Bookmarks</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr colSpan="4" className="transparent">
              <td>
                <Preloader size="lg" />
              </td>
            </tr>
          ) : null}

          {hasData ? renderRows() : null}
        </tbody>
      </table>
    </Element>
  );
};

export default WordsTable;
