import React from 'react';
import { Link } from 'react-router-dom';
import css from './scss/authPage.module.scss';

import AuthForm from './AuthForm';

const AuthSignInForm = () => {
  return (
    <div>
      <span className={css.authTitle}>Sign In to your account</span>
      <AuthForm
        onSubmit={values => console.log(values)}
        submitBtnText="Sign In"
      />
      <div className={css.formLink}>
        <p>Don`t have an account? </p>
        <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  );
};

export default AuthSignInForm;
