import React, { useState, useEffect } from 'react';
import { Column, Table } from 'react-virtualized';
import Preloader from '../preloader';

const WordsTable = ({
  hiddenWords,
  words,
  onActionClick,
  pending,
  tableScrollIdx
}) => {
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

  const renderWord = (key, word) => {
    const { id } = word;

    const isTenCell = id % 10 === 0 || id === 0;
    const cellId = id / 10 + 1;

    const className = setClassName(id, key);
    return (
      <div className="Words__Table__cellContent">
        {isTenCell ? (
          <span>
            <b>{cellId} words column </b>
          </span>
        ) : null}

        <span
          className={`Words__Table__wordBtn ${className}`}
          onClick={e => onWordClick(id, className)}
        >
          {word[key]}
        </span>
      </div>
    );
  };

  const renderActions = id => {
    return (
      <div className="Words__Table__cellContent">
        <button
          className="Words__Table__wordAction"
          onClick={() => onActionClick(id, 'update')}
        >
          <img src="../../img/notepad-update.svg" alt="" />
        </button>

        <button
          className="Words__Table__wordAction"
          onClick={() => onActionClick(id, 'delete')}
        >
          <img src="../../img/notepad-minus.svg" alt="" />
        </button>
      </div>
    );
  };

  const hasData = words.length > 0;
  const isLoading = pending && !hasData;

  return (
    <div className="dictionary__table" id="dictionaryTable">
      {isLoading ? <Preloader size="lg" /> : null}

      {hasData ? (
        <Table
          width={1240}
          height={720}
          headerHeight={45}
          rowHeight={60}
          scrollToIndex={tableScrollIdx * 10}
          rowCount={hasData ? words.length : 0}
          rowGetter={({ index }) => words[index]}
          className="Words__Table"
          headerClassName="Words__Table__headerColumn"
          rowClassName="Words__Table__row"
          gridClassName="Words__Table__Grid"
        >
          <Column
            label="En"
            dataKey="en"
            width={400}
            className="Words__Table__Grid__rowColumn"
            cellRenderer={({ rowData, dataKey }) => {
              return renderWord(dataKey, rowData);
            }}
            flexGrow={1}
          />
          <Column
            width={400}
            label="Ru"
            dataKey="ru"
            className="Words__Table__Grid__rowColumn"
            cellRenderer={({ rowData, dataKey }) => {
              return renderWord(dataKey, rowData);
            }}
            flexGrow={1}
          />
          <Column
            width={190}
            label="Actions"
            className="Words__Table__Grid__rowColumn"
            flexGrow={1}
            dataKey="actions"
            cellRenderer={({ rowData }) => {
              return renderActions(rowData.id);
            }}
          />
          <Column
            width={190}
            label="Bookmarks"
            className="Words__Table__Grid__rowColumn"
            flexGrow={1}
            dataKey="bookmarks"
            cellRenderer={({ rowData }) => {
              const { bookmarks } = rowData;
              return (
                <div className="Words__Table__cellContent">
                  {bookmarks ? (
                    <img src="../../img/lace-star.svg" alt="" />
                  ) : null}
                </div>
              );
            }}
          />
        </Table>
      ) : null}
    </div>
  );
};

export default WordsTable;
