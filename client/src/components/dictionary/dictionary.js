import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWords } from '../../actions/word-list-fetch';

class Dictionary extends Component {

  componentDidMount() {
    this.props.fetchWords();
  }

  renderWords() {
    const { words } = this.props;

    return (
      words.map((data, idx) => (
        <tr key={data.id}>
          <td>{data.en}</td>
          <td>{data.ru}</td>
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
              { words.length > 0 ? this.renderWords() : null }
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