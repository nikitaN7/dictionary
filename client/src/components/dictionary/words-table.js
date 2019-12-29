import React, { useState, useEffect } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import ReactTooltip from 'react-tooltip';
import { debounce } from 'lodash';
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
      <div
        className="Words__Table__cellContent"
        data-tip={word[key]}
        onClick={e => onWordClick(id, className)}
      >
        {isTenCell ? (
          <span>
            <b>{cellId} words column </b>
          </span>
        ) : null}

        <span className={`Words__Table__wordBtn ${className}`}>
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

  const rebuildTooltip = debounce(() => ReactTooltip.rebuild(), 200, {
    leading: false,
    trailing: true
  });

  const hasData = words.length > 0;
  const isLoading = pending && !hasData;

  return (
    <div className="dictionary__table" id="dictionaryTable">
      {isLoading ? <Preloader size="lg" /> : null}

      {hasData ? (
        <AutoSizer>
          {({ width, height }) => (
            <Table
              width={width}
              height={height}
              headerHeight={45}
              rowHeight={60}
              scrollToIndex={(tableScrollIdx * 10).toFixed()}
              rowCount={hasData ? words.length : 0}
              rowGetter={({ index }) => words[index]}
              className="Words__Table"
              headerClassName="Words__Table__headerColumn"
              rowClassName="Words__Table__row"
              gridClassName="Words__Table__Grid"
              onScroll={rebuildTooltip}
            >
              <Column
                label="En"
                dataKey="en"
                width={(width / 100) * 35}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData);
                }}
                flexGrow={1}
              />
              <Column
                width={(width / 100) * 35}
                label="Ru"
                dataKey="ru"
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData);
                }}
                flexGrow={1}
              />

              <Column
                width={(width / 100) * 25}
                label="Actions"
                className="Words__Table__Grid__rowColumn"
                flexGrow={1}
                dataKey="actions"
                cellRenderer={({ rowData }) => {
                  return renderActions(rowData.id);
                }}
              />
              <Column
                width={(width / 100) * 25}
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
          )}
        </AutoSizer>
      ) : null}

      <ReactTooltip
        type="info"
        effect="solid"
        getContent={dataTip => dataTip}
        isCapture={true}
        event="click"
        html={true}
        clickable={true}
        scrollHide={true}
      />
    </div>
  );
};

export default WordsTable;
