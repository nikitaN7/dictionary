import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ScrollField from './scroll-field';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';
import { filterWords } from '../../utils/filterWords';
import { fetchWords } from '../../actions/word-list-fetch';
import { getSortedWords } from '../../selectors';
import DictionaryHeader from './DictionaryHeader';

import Modal from '../modal';

const Dictionary = ({ fetchWords, words, pending }) => {
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
  { fetchWords }
)(Dictionary);
