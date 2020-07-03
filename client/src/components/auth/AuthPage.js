import React from 'react';
import { useLocation } from 'react-router-dom';
import css from './scss/authPage.module.scss';

import AuthSignInForm from './AuthSignInForm';
import AuthSignUpForm from './AuthSignUpForm';

import wavesImg from '../../assets/svg/waves.svg';

const AuthPage = () => {
  const { pathname } = useLocation();

  const chooseFormByPath = () => {
    switch (pathname) {
      case '/signin':
        return <AuthSignInForm />;

      case '/signup':
        return <AuthSignUpForm />;
      default:
        return null;
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <img src={wavesImg} className={css.wavesImg} alt="" />

        <div className={css.auth}>{chooseFormByPath()}</div>
      </div>
    </div>
  );
};

export default AuthPage;
