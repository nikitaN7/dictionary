import React, { Component } from 'react';

class Dictionary extends Component {

  render() {
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
              <tr>
              <td>1</td>
              <td>such as</td>
              <td>например</td>
            </tr>

            <tr>
              <td>2</td>
              <td>each other</td>
              <td>друг друга</td>
            </tr>
          </tbody>

          </table>
        </div>
      </div>
    )
  }
}

export default Dictionary;