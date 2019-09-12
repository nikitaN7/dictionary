import React, { Component } from 'react';
import { Element } from 'react-scroll';
import { HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';
import WordRow from './word-row';
import Preloader from '../preloader';

class WordsTable extends Component {
  state = {
    visibleWordsId: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wordDisplay !== this.props.wordDisplay) {
      this.setState({ visibleWordsId: [] })
    }
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

    return (
      words.map((data, idx) => {
        return (
          <WordRow
            data={data}
            key={idx}
            onActionClick={this.props.onActionClick}
            onWordClick={this.onWordClick}
            index={idx}
            enClass={this.setClassName(data.id, HIDE_EN_WORDS)}
            ruClass={this.setClassName(data.id, HIDE_RU_WORDS)} />
        )
      })
    )
  }

  render() {
    const hasData = this.props.words.length > 0;
    const isLoading = this.props.pending && !hasData;

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
            { isLoading
              ? <tr colSpan="4" className="transparent">
                  <td><Preloader size="lg" /></td>
                </tr>
              : null
            }

            { hasData ? this.renderRows() : null }
          </tbody>
        </table>
      </Element>
    )
  }
}

export default WordsTable;