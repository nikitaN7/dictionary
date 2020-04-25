import React from 'react';
import classNames from 'classnames/bind';
import css from './scss/button.module.scss';

const Button = ({
  styles = {},
  children,
  isPrimary = true,
  onClick = () => {}
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(css.button, {
        [css.primary]: isPrimary
      })}
      style={{ ...styles }}
    >
      {children}
    </button>
  );
};

export default Button;
