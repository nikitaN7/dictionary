import React from 'react';
import { Link } from 'react-router-dom';
import css from './scss/authPage.module.scss';

import AuthForm from './AuthForm';

const AuthSignUpForm = () => {
  return (
    <div>
      <span className={css.authTitle}>Sign Up to your account</span>
      <AuthForm
        onSubmit={values => console.log(values)}
        submitBtnText="Sign Up"
      />
      <div className={css.formLink}>
        <p>Does already have an account? </p>
        <Link to="/signin"> Sign In</Link>
      </div>
    </div>
  );
};

export default AuthSignUpForm;
