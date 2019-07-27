import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchWords } from '../../actions/';

class Dictionary extends Component {

  componentDidMount() {
    this.props.fetchWords();
  }

  renderWords() {
    const { words } = this.props;

    return (
      words.map((data, idx) => (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.en}</td>
          <td>{data.ru}</td>
        </tr>
      ))
    )
  }

  render() {
    const { words } = this.props;

    return (
      <div className="dictionary">
        <div className="dictionary__title">Words dictionary</div>
        <div className="dictionary__table">
          <table style={{borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th>Id</th>
                <th>EN</th>
                <th>RU</th>
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