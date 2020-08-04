import axios from 'axios';
import { authHeader } from '../utils/helpers';

import { Word } from '../types/wordsList';

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

  getOneWord = async (id: number) => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'GET'
    });

    return res;
  };

  addWord = async (data: Word) => {
    const res = await axios({
      url: `${this._baseUrl}`,
      headers: authHeader(),
      method: 'POST',
      data
    });

    return res;
  };

  addWords = async (data: Word) => {
    const res = await axios({
      url: `${this._baseUrl}`,
      headers: authHeader(),
      method: 'POST',
      data
    });

    return res;
  };

  updateWord = async (id: number, data: { data: Word }) => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'PATCH',
      data
    });

    return res;
  };

  deleteOneWord = async (id: number) => {
    const res = await axios({
      url: `${this._baseUrl}/${id}`,
      headers: authHeader(),
      method: 'DELETE'
    });

    return res;
  };

  deleteWords = async (ids: number[]) => {
    const res = await axios({
      url: `${this._baseUrl}/`,
      headers: authHeader(),
      method: 'DELETE',
      data: { ids }
    });

    return res;
  };
}
