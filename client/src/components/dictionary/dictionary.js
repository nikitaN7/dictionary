import React, { Component } from 'react';
import { connect } from 'react-redux';
import WordsHide from './words-hide';
import WordsUploadBox from './words-upload-box';
import WordsUploadDropdown from './words-upload-dropdown';
import ScrollGroup from './scroll-group';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';

import { fetchWords } from '../../actions/word-list-fetch';
import { filterWordsByType } from '../../function/filterWordsByType';
import { searchWordsByStr } from '../../function/searchWordsByStr';
import { getSortedWords } from '../../selectors';

class Dictionary extends Component {
  state = {
    hiddenWords: '',
    uploadBoxIsOpen: false,
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

  setHiddenWords = value => {
    this.setState({ hiddenWords: value });
  };

  toggleUploadBox = () => {
    this.setState(prevState => {
      return { uploadBoxIsOpen: !prevState.uploadBoxIsOpen };
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
      hiddenWords,
      uploadBoxIsOpen
    } = this.state;

    return (
      <div className="dictionary">
        <div className="dictionary__row">
          <WordsHide
            setHiddenWords={this.setHiddenWords}
            hiddenWords={hiddenWords}
          />

          <WordsUploadDropdown
            handleClick={this.toggleUploadBox}
            isActive={uploadBoxIsOpen}
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

        {uploadBoxIsOpen ? <WordsUploadBox /> : null}

        <WordsTable
          words={words}
          pending={pending}
          filterType={filterType}
          searchValue={searchValue}
          onActionClick={onActionClick}
          hiddenWords={hiddenWords}
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
