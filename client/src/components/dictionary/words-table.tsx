import React, { useState, useEffect } from 'react';
import {
  Column,
  Table,
  AutoSizer,
  defaultTableRowRenderer
} from 'react-virtualized';
import ReactTooltip from 'react-tooltip';
import debounce from 'lodash.debounce';

import SoundIcon from '../../assets/icons/SoundIcon';
import Checkbox from '../ui/Checkbox';
import Preloader from '../preloader';

import { Word } from '../../types/wordsList';

type Props = {
  hiddenWords: string;
  words: Word[];
  onActionClick(id: number | null, action: string): {};
  pending: boolean;
  tableScrollIdx: number;
  wordSelectHandler(id: number): void;
  selectedWords: number[];
};

const WordsTable: React.FC<Props> = ({
  hiddenWords,
  words,
  onActionClick,
  pending,
  tableScrollIdx,
  wordSelectHandler,
  selectedWords = []
}) => {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);

  useEffect(() => {
    setVisibleWords([]);
  }, [hiddenWords]);

  const onWordClick = (id: number, className: string) => {
    if (!visibleWords.includes(id) && className === 'hide') {
      setVisibleWords(prevState => [...prevState, id]);
    }
  };

  const setClassName = (id: number, option: string): string => {
    if (!visibleWords.includes(id) && hiddenWords === option) {
      return 'hide';
    }

    return '';
  };

  const renderWord = (key: string, word: any, hasSound: boolean) => {
    const { id } = word;
    const className = setClassName(id, key);

    return (
      <div
        className="Words__Table__cellContent"
        data-tip={word[key]}
        onClick={e => onWordClick(id, className)}
      >
        {hasSound && (
          <button
            className={`Words__Table__soundBtn ${className}`}
            onClick={() => window.responsiveVoice.speak(word[key])}
          >
            <SoundIcon />
          </button>
        )}
        <span className={`Words__Table__wordBtn ${className}`}>
          {word[key]}
        </span>
      </div>
    );
  };

  const renderActions = (id: number) => {
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

        <Checkbox
          onChange={() => wordSelectHandler(id)}
          checked={selectedWords.includes(id)}
        />
      </div>
    );
  };

  const renderRow = (...props: any) => {
    const item = props[0];
    const { bookmarks } = item.rowData;

    if (bookmarks) {
      return defaultTableRowRenderer({
        ...item,
        className: `${item.className} Words__Table__row--marked`
      });
    }

    return defaultTableRowRenderer(item);
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
              scrollToIndex={Number((tableScrollIdx * 10).toFixed())}
              rowCount={hasData ? words.length : 0}
              rowGetter={({ index }) => words[index]}
              className="Words__Table"
              headerClassName="Words__Table__headerColumn"
              rowClassName="Words__Table__row"
              gridClassName="Words__Table__Grid"
              onScroll={rebuildTooltip}
              rowRenderer={renderRow}
            >
              <Column
                label="Id"
                dataKey=""
                width={(width / 100) * 5}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowIndex }) => {
                  return (
                    <div className="Words__Table__cellContent center">
                      {rowIndex}
                    </div>
                  );
                }}
                flexGrow={1}
              />

              <Column
                label="En"
                dataKey="en"
                width={(width / 100) * 35}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData, true);
                }}
                flexGrow={1}
              />
              <Column
                width={(width / 100) * 35}
                label="Ru"
                dataKey="ru"
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData, false);
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
