import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import css from './scss/authPage.module.scss';
import classNames from 'classnames/bind';

import AuthForm from './AuthForm';

import { signup } from '../../actions/userActions';

const AuthSignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async values => {
    const { email, password } = values;

    setLoading(true);

    const res = await dispatch(signup(email, password));
    setLoading(false);

    if (!res.success) {
      return setError(res.error);
    }

    history.push('/dictionary');
  };

  return (
    <div
      className={classNames(css.authWrapper, {
        [css.authWrapperDisabled]: loading
      })}
    >
      <span className={css.authTitle}>Sign Up to your account</span>
      <AuthForm onSubmit={handleSubmit} submitBtnText="Sign Up" />

      {error && <span className={css.authError}>{error}</span>}
      <div className={css.formLink}>
        <p>Does already have an account? </p>
        <Link to="/signin"> Sign In</Link>
      </div>
    </div>
  );
};

export default AuthSignUpForm;
