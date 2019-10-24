import React, { Component } from 'react';
import { Element } from 'react-scroll';
import { HIDE_EN_WORDS, HIDE_RU_WORDS } from '../../constants';
import WordRow from './word-row';
import Preloader from '../preloader';

class WordsTable extends Component {
  state = {
    visibleWordsId: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.hiddenWords !== this.props.hiddenWords) {
      this.setState({ visibleWordsId: [] });
    }
  }

  onWordClick = (id, className) => {
    let list = this.state.visibleWordsId;

    if (!list.includes(id) && className === 'hide') {
      this.setState({
        visibleWordsId: [...list, id]
      });
    }
  };

  setClassName(id, option) {
    const { visibleWordsId } = this.state;
    const { hiddenWords } = this.props;

    if (!visibleWordsId.includes(id) && hiddenWords === option) {
      return 'hide';
    }

    return '';
  }

  renderRows() {
    const { words, onActionClick } = this.props;

    return words.map((data, idx) => {
      return (
        <WordRow
          data={data}
          key={idx}
          onActionClick={onActionClick}
          onWordClick={this.onWordClick}
          index={idx}
          enClass={this.setClassName(data.id, HIDE_EN_WORDS)}
          ruClass={this.setClassName(data.id, HIDE_RU_WORDS)}
        />
      );
    });
  }

  render() {
    const { words, pending } = this.props;
    const hasData = words.length > 0;
    const isLoading = pending && !hasData;

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
            {isLoading ? (
              <tr colSpan="4" className="transparent">
                <td>
                  <Preloader size="lg" />
                </td>
              </tr>
            ) : null}

            {hasData ? this.renderRows() : null}
          </tbody>
        </table>
      </Element>
    );
  }
}

export default WordsTable;
