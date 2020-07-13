import React from 'react';
import classNames from 'classnames/bind';
import css from './scss/button.module.scss';

type Props = {
  isPrimary?: boolean;
  onClick(): void;
  styles: {
    [className: string]: string;
  };
};

const Button: React.FC<Props> = ({
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
