import axios from 'axios';

export default class WordsApi {
  _baseUrl = `/api/`;

  signIn = async (email, password) => {
    const res = await axios({
      url: `${this._baseUrl}/signin`,
      method: 'POST',
      data: {
        email,
        password
      }
    });

    return res;
  };

  singUp = async (email, password) => {
    const res = await axios({
      url: `${this._baseUrl}/signup`,
      method: 'POST',
      data: {
        email,
        password
      }
    });

    return res;
  };
}
