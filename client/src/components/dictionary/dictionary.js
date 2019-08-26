import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWords } from '../../actions/word-list-fetch';
import WordsDisplay from './words-display';
import WordsUpload from './words-upload';
import WordRow from './word-row';
import ScrollGroup from './scroll-group';
import { SHOW_ALL_WORDS, HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';
import { Element } from 'react-scroll';
import WordsFilter from './words-filter';
import WordsSearch from './words-search';
import { filterWordsByType } from '../../function/filterWordsByType';
import { searchWordsByStr } from '../../function/searchWordsByStr';

class Dictionary extends Component {

  state = {
    wordDisplay: SHOW_ALL_WORDS,
    visibleWordsId: [],
    isBoxActive: false,
    filterType: 'all-words',
    searchValue: ''
  }

  optionClick = (value) => {
    this.setState({wordDisplay: value, visibleWordsId: []})
  }

  componentDidMount() {
    this.props.fetchWords();
  }

  boxActiveToggle = (e) => {
    this.setState(prevState => {
      return {isBoxActive: !prevState.isBoxActive}
    })
  }

  onFilterChange = (value) => {
    this.setState({
      filterType: value
    })
  }

  onWordClick = (id, className) => {
    let list = this.state.visibleWordsId;

    if (!list.includes(id) && className === 'hide') {
      this.setState({
        visibleWordsId: [...list, id]
      })
    }

  }

  setClassName(id, option) {
    const { wordDisplay, visibleWordsId } = this.state;

    if (!visibleWordsId.includes(id) && wordDisplay === option) {
      return 'hide';
    }

    return '';
  }

  handleChange = ({target}) => {
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    })
  }

  renderRows() {
    let { words } = this.props;
    words = filterWordsByType(words, this.state.filterType);
    words = searchWordsByStr(words, this.state.searchValue);

    return (
      words.map((data, idx) => {
        return (
          <WordRow
            data={data}
            key={data.idx}
            onActionClick={this.props.onActionClick}
            onWordClick={this.onWordClick}
            idx={idx}
            enClass={this.setClassName(data.id, HIDE_EN_WORDS)}
            ruClass={this.setClassName(data.id, HIDE_RU_WORDS)} />
        )
      })
    )
  }

  render() {
    const { words } = this.props;

    return (
      <div className="dictionary">
        <div className="dictionary__header">
          <div className="dictionary__title">
            <img src="/img/dictonary-icon.png" alt=""/>
            <h1>Words dictionary</h1>
          </div>

          <button className="btn btn--lg btn--add" onClick={(e) => this.props.onActionClick(null, 'add')}>Add new word</button>
        </div>

        <div className="dictionary__row">
          <WordsDisplay
            optionClick={this.optionClick}
            wordDisplay={this.state.wordDisplay}/>

          <div class="dictionary__options">
            <div onClick={this.boxActiveToggle} class={`dictionary__options__item green ${this.state.isBoxActive ? 'is-open' : 'is-close'}`}>
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

          <Element className="dictionary__table" id="dictionaryTable">
            <table style={{borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th>EN</th>
                  <th>RU</th>
                  <th>Action</th>
                  <th>Bookmarks</th>
                </tr>
              </thead>

              <tbody>
                { words.length > 0 ? this.renderRows() : null }
              </tbody>
            </table>
          </Element>

      </div>
    )
  }
}

const mapStateToProps = ({wordList}) => {
  return {
    words: wordList.words,
    error: wordList.error
  }
}

export default connect(
  mapStateToProps,
  { fetchWords }
)(Dictionary);