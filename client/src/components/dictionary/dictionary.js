import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWords } from '../../actions/word-list-fetch';
import WordsDisplay from './words-display';
import { SHOW_ALL_WORDS, HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';

class Dictionary extends Component {

  state = {
    wordDisplay: SHOW_ALL_WORDS,
    visibleWordsId: []
  }

  optionClick = (value) => {
    this.setState({wordDisplay: value, visibleWordsId: []})
  }

  componentDidMount() {
    this.props.fetchWords();
  }

  onWordClick(id, className) {
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

  renderWords(id, ruWord, enWord) {
    const enClass = this.setClassName(id, HIDE_EN_WORDS);
    const ruClass = this.setClassName(id, HIDE_RU_WORDS);

    return (
      <React.Fragment>
        <td
          onClick={(e) => this.onWordClick(id, enClass)}
          className={enClass}>{enWord}
        </td>

        <td
          onClick={(e) => this.onWordClick(id, ruClass)}
          className={ruClass}>{ruWord}
        </td>
      </React.Fragment>
    )
  }

  renderRows() {
    const { words } = this.props;

    return (
      words.map((data, idx) => (
        <tr key={data.id}>

          {this.renderWords(data.id, data.ru, data.en)}

          <td>
            <span onClick={(e) => this.props.onActionClick(data.id, 'update')}>
              <img src="../../img/notepad-update.svg" alt=""/>
            </span>

            <span onClick={(e) => this.props.onActionClick(data.id, 'delete')}>
              <img src="../../img/notepad-minus.svg" alt=""/>
            </span>
          </td>

          <td>
            {data.bookmarks
              ? <img src="../../img/lace-star.svg" alt=""/>
              : null}
          </td>

        </tr>
      ))
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

        <WordsDisplay optionClick={this.optionClick} wordDisplay={this.state.wordDisplay}/>

        <div className="dictionary__table">
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
        </div>
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