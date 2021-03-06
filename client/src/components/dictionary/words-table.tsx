import React, { useState, useEffect } from 'react';
import {
  Column,
  Table,
  AutoSizer,
  defaultTableRowRenderer
} from 'react-virtualized';
import ReactTooltip from 'react-tooltip';
import debounce from 'lodash.debounce';
import { FaEdit, FaTrash, FaVolumeUp, FaEye, FaEyeSlash } from 'react-icons/fa';

import SoundIcon from '../../assets/icons/SoundIcon';
import Checkbox from '../ui/Checkbox';
import Preloader from '../preloader/preloader';

import { Word } from '../../types/wordsList';

type Props = {
  hiddenWords: string;
  words: Word[];
  onActionClick(id: number | null, action: string): void;
  pending: boolean;
  tableScrollIdx: number | null;
  wordSelectHandler(id: number): void;
  selectedWords: number[];
  allWordsSelectHandler(type: 'selectAll' | 'cancelAll'): void;
  setHiddenWords(value: string): void;
};

const WordsTable: React.FC<Props> = ({
  hiddenWords,
  words,
  onActionClick,
  pending,
  tableScrollIdx,
  wordSelectHandler,
  selectedWords = [],
  allWordsSelectHandler = () => {},
  setHiddenWords = () => {}
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
            <FaVolumeUp className="Words__Table__soundBtn__icon" />
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
        <div className="Words__Table__actions">
          <button
            className="Words__Table__actions__btn Words__Table__actions__btn--edit"
            onClick={() => onActionClick(id, 'update')}
          >
            <FaEdit />
          </button>

          <button
            className="Words__Table__actions__btn Words__Table__actions__btn--delete"
            onClick={() => onActionClick(id, 'delete')}
          >
            <FaTrash />
          </button>
        </div>
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
              scrollToIndex={
                tableScrollIdx ? Number(tableScrollIdx.toFixed()) - 1 : 0
              }
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
                label={
                  <Checkbox
                    showMinus={selectedWords.length > 0}
                    onChange={() => {
                      if (selectedWords.length > 0) {
                        allWordsSelectHandler('cancelAll');
                      } else {
                        allWordsSelectHandler('selectAll');
                      }
                    }}
                  />
                }
                dataKey=""
                width={50}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData }) => {
                  return (
                    <div className="Words__Table__cellContent">
                      <Checkbox
                        onChange={() => wordSelectHandler(rowData.id)}
                        checked={selectedWords.includes(rowData.id)}
                      />
                    </div>
                  );
                }}
              />
              <Column
                label="№"
                dataKey=""
                width={50}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowIndex }) => {
                  return (
                    <div className="Words__Table__cellContent">
                      {rowIndex + 1}
                    </div>
                  );
                }}
              />

              <Column
                label={
                  <div className="Words__Table__wordRow">
                    En{' '}
                    <button
                      onClick={() => {
                        setHiddenWords(hiddenWords === 'en' ? '' : 'en');
                      }}
                    >
                      {hiddenWords === 'en' ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                }
                dataKey="en"
                width={1}
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData, true);
                }}
                flexGrow={1}
              />
              <Column
                width={1}
                label={
                  <div className="Words__Table__wordRow">
                    Ru{' '}
                    <button
                      onClick={() => {
                        setHiddenWords(hiddenWords === 'ru' ? '' : 'ru');
                      }}
                    >
                      {hiddenWords === 'ru' ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                }
                dataKey="ru"
                className="Words__Table__Grid__rowColumn"
                cellRenderer={({ rowData, dataKey }) => {
                  return renderWord(dataKey, rowData, false);
                }}
                flexGrow={1}
              />

              <Column
                width={80}
                label=""
                className="Words__Table__Grid__rowColumn"
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
