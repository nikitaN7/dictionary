import React from 'react';
import css from './scss/authPage.module.scss';

import { Link } from 'react-router-dom';

import wavesImg from '../../assets/svg/waves.svg';

const AuthPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <img src={wavesImg} className={css.wavesImg} alt="" />

        <div className={css.auth}>
          <span className={css.authTitle}>Sign In to your account</span>

          <form action="#" className={css.authForm}>
            <div className={css.formGroup}>
              <label htmlFor="" className={css.formLabel}>
                Username or Email
              </label>
              <input
                placeholder="Enter your email"
                type="text"
                className={css.formInput}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="" className={css.formLabel}>
                Password
              </label>
              <input
                placeholder="Enter your password"
                type="text"
                className={css.formInput}
              />
            </div>

            <button className={css.formSubmit}>Sign In</button>

            <div className={css.formLink}>
              <p>Don`t have an account? </p>
              <Link to=""> Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
