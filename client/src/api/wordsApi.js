import axios from 'axios';
import { authHeader } from '../utils/helpers';

export default class WordsApi {
  _baseUrl = `/api/words`;

  getWords = async () => {
    const res = await axios({
      url: this._baseUrl,
      headers: authHeader(),
      method: 'GET'
    });

    return res;
  };

  getOneWord = async id => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'GET'
    });

    return res;
  };

  addWord = async data => {
    const res = await axios({
      url: `${this._baseUrl}`,
      headers: authHeader(),
      method: 'POST',
      data
    });

    return res;
  };

  addWords = async data => {
    const res = await axios({
      url: `${this._baseUrl}`,
      headers: authHeader(),
      method: 'POST',
      data
    });

    return res;
  };

  updateWord = async (id, data) => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'PATCH',
      data
    });

    return res;
  };

  deleteOneWord = async id => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'DELETE'
    });

    return res;
  };

  deleteAllWords = async () => {
    const res = await axios({
      url: `${this._baseUrl}/`,
      headers: authHeader(),
      method: 'DELETE'
    });

    return res;
  };
}
