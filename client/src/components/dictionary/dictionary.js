import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ScrollField from './scroll-field';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';
import DictionaryHeader from './DictionaryHeader';
import DictionaryMenu from './DictionaryMenu';
import Modal from '../modal';

import { filterWords } from '../../utils/filterWords';
import { fetchWords } from '../../actions/word-list-fetch';
import { setRepetitionData } from '../../actions/wordsRepetitionActions';
import { getSortedWords } from '../../selectors';

const Dictionary = ({ fetchWords, words, pending, setRepetitionData }) => {
  const [hiddenWords, setHiddenWords] = useState('');
  const [filteredWords, setFilteredWords] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [tableScrollIdx, setTableScrollIdx] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    filterSearch: '',
    filterType: 'all-words'
  });
  const [word, setWord] = useState({
    id: null,
    action: ''
  });

  const history = useHistory();

  useEffect(() => fetchWords(), [fetchWords]);

  useEffect(() => {
    const newWords = filterWords(words, filterOptions);

    setFilteredWords(newWords);
  }, [words, filterOptions]);

  const handleChange = (name, value) => {
    setFilterOptions(filterOptions => ({
      ...filterOptions,
      [name]: value
    }));
  };

  const wordSelectHandler = id => {
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

  const onActionClick = (id, action) => {
    setModalShow(true);
    setWord({ id, action });
  };

  const handleTableScroll = value => {
    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setTableScrollIdx(value);
    }
  };

  const isRenderMenu = selectedWords.length > 0;

  return (
    <>
      <div className="dictionary">
        <div className="dictionary__row">
          <DictionaryHeader
            onActionClick={onActionClick}
            setHiddenWords={setHiddenWords}
            hiddenWords={hiddenWords}
          />

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

        {isRenderMenu ? (
          <DictionaryMenu
            selectedWords={selectedWords}
            clearSelectedWords={clearSelectedWords}
            exerciseSelectedWords={exerciseSelectedWords}
          />
        ) : null}

        <WordsTable
          words={filteredWords}
          pending={pending}
          onActionClick={onActionClick}
          hiddenWords={hiddenWords}
          tableScrollIdx={tableScrollIdx}
          wordSelectHandler={wordSelectHandler}
          selectedWords={selectedWords}
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

const mapStateToProps = state => {
  return {
    words: getSortedWords(state),
    pending: state.wordList.pending
  };
};

export default connect(
  mapStateToProps,
  { fetchWords, setRepetitionData }
)(Dictionary);
