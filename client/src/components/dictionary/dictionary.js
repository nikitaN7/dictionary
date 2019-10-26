import React, { Component } from 'react';
import { connect } from 'react-redux';
import WordsHide from './words-hide';
import WordsUploadBox from './words-upload-box';
import WordsUploadDropdown from './words-upload-dropdown';
import ScrollField from './scroll-field';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import WordsTable from './words-table';
import { filterWords } from '../../function/filterWords';
import { fetchWords } from '../../actions/word-list-fetch';
import { getSortedWords } from '../../selectors';

class Dictionary extends Component {
  state = {
    hiddenWords: '',
    uploadBoxIsOpen: false,
    filterOptions: {
      filterSearch: '',
      filterType: 'all-words'
    },
    filteredWords: {}
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

  handleChange = (name, value) => {
    this.setState(
      {
        filterOptions: {
          ...this.state.filterOptions,
          [name]: value
        }
      },
      () => this.wordsUpdate()
    );
  };

  wordsUpdate() {
    const { words } = this.props;
    const { filterOptions } = this.state;

    this.setState({ filteredWords: filterWords(words, filterOptions) });
  }

  render() {
    const { onActionClick, pending } = this.props;
    const {
      filterOptions,
      filteredWords,
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

          <ScrollField />

          <WordsSearch
            searchValue={filterOptions.filterSearch}
            handleChange={this.handleChange}
          />

          <WordsFilter
            filterType={filterOptions.filterType}
            handleChange={this.handleChange}
          />
        </div>

        {uploadBoxIsOpen ? <WordsUploadBox /> : null}

        <WordsTable
          words={filteredWords}
          pending={pending}
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
