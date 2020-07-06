import axios from 'axios';

export default class WordsApi {
  _baseUrl = `/api`;

  signIn = async (email: string, password: string) => {
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

  signUp = async (email: string, password: string) => {
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
