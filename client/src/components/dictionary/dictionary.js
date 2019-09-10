import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWords } from '../../actions/word-list-fetch';
import WordsDisplay from './words-display';
import WordsUpload from './words-upload';
import ScrollGroup from './scroll-group';
import { SHOW_ALL_WORDS } from '../../constants';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';

import WordsTable from './words-table';

class Dictionary extends Component {
  state = {
    wordDisplay: SHOW_ALL_WORDS,
    isBoxActive: false,
    filterType: 'all-words',
    searchValue: ''
  }

  optionClick = (value) => {
    this.setState({ wordDisplay: value, visibleWordsId: [] })
  }

  componentDidMount() {
    this.props.fetchWords();
  }

  boxActiveToggle = () => {
    this.setState(prevState => {
      return { isBoxActive: !prevState.isBoxActive }
    })
  }

  onFilterChange = (value) => {
    this.setState({
      filterType: value
    })
  }

  handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { words, pending } = this.props;

    const isLoading = pending && words.length === 0;
    const boxActiveClass = this.state.isBoxActive ? 'is-open' : 'is-close';

    return (
      <div className="dictionary">
        <div className="dictionary__row">
          <WordsDisplay
            optionClick={this.optionClick}
            wordDisplay={this.state.wordDisplay}/>

          <div className="dictionary__options">
            <div
              onClick={this.boxActiveToggle}
              className={`dictionary__options__item green ${boxActiveClass}`} >

              <img src="/img/import-icon.svg" alt=""/>
              <span>Import words</span>
            </div>
          </div>

          <ScrollGroup />

          <WordsSearch
            searchValue={this.state.searchValue}
            handleChange={this.handleChange} />

          <WordsFilter
            onFilterChange={this.onFilterChange}
            filterType={this.state.filterType} />
        </div>

        { this.state.isBoxActive ? <WordsUpload /> : null }

        <WordsTable
          words={words}
          isLoading={isLoading}
          filterType={this.state.filterType}
          searchValue={this.state.searchValue}
          onActionClick={this.props.onActionClick}
          wordDisplay={this.state.wordDisplay} />

      </div>
    )
  }
}

const mapStateToProps = ({ wordList }) => {
  return {
    words: wordList.words,
    error: wordList.error,
    pending: wordList.pending
  }
}

export default connect(
  mapStateToProps,
  { fetchWords }
)(Dictionary);