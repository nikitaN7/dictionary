import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import css from './scss/authPage.module.scss';
import classNames from 'classnames/bind';

import AuthForm from './AuthForm';

import { signin } from '../../actions/userActions';

type Props = {};

type FormValues = {
  email: string;
  password: string;
};

const AuthSignInForm: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values: FormValues) => {
    const { email, password } = values;

    setLoading(true);

    const res = (await dispatch(signin(email, password))) as any;
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
      <span className={css.authTitle}>Sign In to your account</span>
      <AuthForm
        onSubmit={handleSubmit}
        submitBtnText="Sign In"
        validatePassword={false}
      />

      {error && <span className={css.authError}>{error}</span>}
      <div className={css.formLink}>
        <p>Don`t have an account? </p>
        <Link to="/signup"> Sign Up</Link>
      </div>
    </div>
  );
};

export default AuthSignInForm;
