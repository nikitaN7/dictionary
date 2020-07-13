import React from 'react';
import { useForm } from 'react-hook-form';
import css from './scss/authPage.module.scss';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  onSubmit(values: FormValues): Promise<void>;
  submitBtnText: string;
  validatePassword?: boolean;
};

const AuthForm: React.FC<Props> = ({
  onSubmit = () => {},
  submitBtnText = '',
  validatePassword = true
}) => {
  const { register, errors, handleSubmit } = useForm<FormValues>();

  return (
    <form action="#" className={css.authForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.formGroup}>
        <label htmlFor="" className={css.formLabel}>
          Email
        </label>
        <input
          ref={register({
            required: 'This field is required',
            pattern: {
              value: /^\S+@\S+$/,
              message: 'Invalid email address'
            }
          })}
          name="email"
          placeholder="Enter your email"
          className={css.formInput}
        />
        {errors.email && (
          <span className={css.formGroupError}>{errors.email.message}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="" className={css.formLabel}>
          Password
        </label>
        <input
          ref={register({
            required: 'This field is required',
            validate: value => {
              if (validatePassword && value.length < 8) {
                return 'Min length is 8';
              }
            }
          })}
          type="password"
          name="password"
          placeholder="Enter your password"
          className={css.formInput}
        />
        {errors.password && (
          <span className={css.formGroupError}>{errors.password.message}</span>
        )}
      </div>

      <button className={css.formSubmit}>{submitBtnText}</button>
    </form>
  );
};

export default AuthForm;
