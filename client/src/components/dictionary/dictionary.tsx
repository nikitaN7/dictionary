import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ScrollField from './scroll-field';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';
import DictionaryHeader from './DictionaryHeader';
import DictionaryMenu from './DictionaryMenu';
import Modal from '../modal/Modal';

import { filterWords } from '../../utils/filterWords';
import { fetchWords } from '../../actions/word-list-fetch';
import { setRepetitionData } from '../../actions/wordsRepetitionActions';
import { getSortedWords } from '../../selectors';

import { Word } from '../../types/wordsList';
import { RootState } from '../../reducers/index';

type Props = {
  fetchWords(): void;
  pending: boolean;
  words: Word[];
  setRepetitionData(data: number[]): void;
};

type FilterOptionsType = {
  filterSearch: string;
  filterType: string;
};

const Dictionary: React.FC<Props> = ({
  fetchWords,
  words,
  pending,
  setRepetitionData
}) => {
  const [hiddenWords, setHiddenWords] = useState<string>('');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [tableScrollIdx, setTableScrollIdx] = useState<null | number>(null);
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    filterSearch: '',
    filterType: 'all-words'
  });

  const [word, setWord] = useState<{
    id: null | number;
    action: string;
  }>({
    id: null,
    action: ''
  });

  const history = useHistory();

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  useEffect(() => {
    const newWords = filterWords(words, filterOptions);

    setFilteredWords(newWords);
  }, [words, filterOptions]);

  const handleChange = (name: string, value: string) => {
    setFilterOptions(filterOptions => ({
      ...filterOptions,
      [name]: value
    }));
  };

  const wordSelectHandler = (id: number) => {
    const isAlreadyAdded = selectedWords.includes(id);

    if (isAlreadyAdded) {
      const findIdx = selectedWords.findIndex(item => item === id);

      setSelectedWords(state => [
        ...state.slice(0, findIdx),
        ...state.slice(findIdx + 1)
      ]);

      return;
    }

    setSelectedWords(state => [...state, id]);
  };

  const allWordsSelectHandler = (type: 'selectAll' | 'cancelAll') => {
    if (type === 'selectAll') {
      setSelectedWords(words.map(({ id }) => id));
    }

    if (type === 'cancelAll') {
      setSelectedWords([]);
    }
  };

  const clearSelectedWords = () => {
    setSelectedWords([]);
  };

  const exerciseSelectedWords = () => {
    setRepetitionData(selectedWords);
    history.push('/trainer');
  };

  const modalClose = () => {
    setModalShow(false);
  };

  const onActionClick = (id: number | null, action: string) => {
    setModalShow(true);
    setWord({ id, action });
  };

  const handleTableScroll = (value: string) => {
    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setTableScrollIdx(Number(value));
    }
  };

  return (
    <>
      <div className="dictionary">
        <div className="dictionary__row">
          <WordsSearch
            searchValue={filterOptions.filterSearch}
            handleChange={handleChange}
          />

          <ScrollField
            handleTableScroll={handleTableScroll}
            tableScrollIdx={tableScrollIdx}
          />

          <WordsFilter
            filterType={filterOptions.filterType}
            handleChange={handleChange}
          />
        </div>

        <DictionaryMenu
          selectedWords={selectedWords}
          clearSelectedWords={clearSelectedWords}
          exerciseSelectedWords={exerciseSelectedWords}
          onActionClick={onActionClick}
        />

        <WordsTable
          words={filteredWords}
          pending={pending}
          onActionClick={onActionClick}
          hiddenWords={hiddenWords}
          tableScrollIdx={tableScrollIdx}
          wordSelectHandler={wordSelectHandler}
          allWordsSelectHandler={allWordsSelectHandler}
          selectedWords={selectedWords}
          setHiddenWords={setHiddenWords}
        />
      </div>

      <Modal
        modalClose={modalClose}
        isOpen={modalShow}
        wordId={word.id}
        wordAction={word.action}
        setTableScrollIdx={setTableScrollIdx}
      />
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    words: getSortedWords(state),
    pending: state.wordList.pending
  };
};

export default connect(mapStateToProps, { fetchWords, setRepetitionData })(
  Dictionary
);
