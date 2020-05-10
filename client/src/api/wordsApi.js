import axios from 'axios';

export default class WordsApi {
  _baseUrl = `/api/words`;

  getWords = async () => {
    const res = await axios({
      url: this._baseUrl,
      method: 'GET'
    });

    return res;
  };

  getOneWord = async id => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      method: 'GET'
    });

    return res;
  };

  addWord = async data => {
    const res = await axios({
      url: `${this._baseUrl}`,
      method: 'POST',
      data
    });

    return res;
  };

  addWords = async data => {
    const res = await axios({
      url: `${this._baseUrl}`,
      method: 'POST',
      data
    });

    return res;
  };

  updateWord = async (id, data) => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      method: 'PATCH',
      data
    });

    return res;
  };

  deleteOneWord = async id => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      method: 'DELETE'
    });

    return res;
  };

  deleteAllWords = async () => {
    const res = await axios({
      url: `${this._baseUrl}/`,
      method: 'DELETE'
    });

    return res;
  };
}
