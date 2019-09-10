import React, { Component } from 'react';
import { Element } from 'react-scroll';
import { filterWordsByType } from '../../function/filterWordsByType';
import { searchWordsByStr } from '../../function/searchWordsByStr';
import { HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';
import WordRow from './word-row';
import Preloader from '../preloader';

class WordsTable extends Component {
  state = {
    visibleWordsId: []
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
    const { visibleWordsId } = this.state;
    const { wordDisplay } = this.props;

    if (!visibleWordsId.includes(id) && wordDisplay === option) {
      return 'hide';
    }

    return '';
  }

  renderRows() {
    let { words } = this.props;
    words = filterWordsByType(words, this.props.filterType);
    words = searchWordsByStr(words, this.props.searchValue);

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
    return (
      <Element className="dictionary__table" id="dictionaryTable">
        <table>
          <thead>
            <tr className="blue">
              <th>EN</th>
              <th>RU</th>
              <th>Action</th>
              <th>Bookmarks</th>
            </tr>
          </thead>

          <tbody>
            { this.props.isLoading
              ? <tr><Preloader size="lg" /></tr>
              : null
            }

            { this.props.words.length > 0 ? this.renderRows() : null }
          </tbody>
        </table>
      </Element>
    )
  }
}

export default WordsTable;