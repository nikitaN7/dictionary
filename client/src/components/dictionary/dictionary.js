import React, { Component } from 'react';
import { connect } from 'react-redux';
import WordsDisplay from './words-display';
import WordsUpload from './words-upload';
import ScrollGroup from './scroll-group';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';
import WordsImport from './words-import';
import { SHOW_ALL_WORDS } from '../../constants';
import { fetchWords } from '../../actions/word-list-fetch';
import { filterWordsByType } from '../../function/filterWordsByType';
import { searchWordsByStr } from '../../function/searchWordsByStr';
import { getSortedWords } from '../../selectors';

class Dictionary extends Component {
  state = {
    wordDisplay: SHOW_ALL_WORDS,
    isBoxActive: false,
    filterType: 'all-words',
    searchValue: '',
    words: {}
  };

  componentDidMount() {
    this.props.fetchWords();
  }

  componentDidUpdate(prevProps) {
    const { words } = this.props;

    if (prevProps.words !== words) {
      this.wordsUpdate();
    }
  }

  optionClick = value => {
    this.setState({ wordDisplay: value });
  };

  boxActiveToggle = () => {
    this.setState(prevState => {
      return { isBoxActive: !prevState.isBoxActive };
    });
  };

  onFilterClick = value => {
    this.setState(
      {
        filterType: value
      },
      () => this.wordsUpdate()
    );
  };

  handleChange = (name, value) => {
    let wordsUpdateNames = ['searchValue', 'filterType'];

    for (let prop of wordsUpdateNames) {
      if (prop === name) {
        this.setState({ [name]: value }, () => this.wordsUpdate());
        return;
      }
    }

    this.setState({ [name]: value });
  };

  wordsUpdate() {
    let { words } = this.props;
    const { searchValue, filterType } = this.state;

    words = searchWordsByStr(words, searchValue);
    words = filterWordsByType(words, filterType);

    this.setState({ words });
  }

  render() {
    const { onActionClick, pending } = this.props;
    const {
      searchValue,
      filterType,
      words,
      wordDisplay,
      isBoxActive
    } = this.state;

    return (
      <div className="dictionary">
        <div className="dictionary__row">
          <WordsDisplay
            optionClick={this.optionClick}
            wordDisplay={wordDisplay}
          />

          <WordsImport
            handleClick={this.boxActiveToggle}
            isActive={isBoxActive}
          />

          <ScrollGroup />

          <WordsSearch
            searchValue={searchValue}
            handleChange={this.handleChange}
          />

          <WordsFilter
            filterType={filterType}
            handleChange={this.handleChange}
          />
        </div>

        {isBoxActive ? <WordsUpload /> : null}

        <WordsTable
          words={words}
          pending={pending}
          filterType={filterType}
          searchValue={searchValue}
          onActionClick={onActionClick}
          wordDisplay={wordDisplay}
        />
      </div>
    );
  }
}

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
