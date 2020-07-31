import React from 'react';
import classNames from 'classnames/bind';
import css from './scss/checkbox.module.scss';

type Props = {
  checked?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  type?: string;
  showMinus?: boolean;
  inputName?: string;
};

const Checkbox: React.FC<Props> = ({
  checked = false,
  onChange = () => {},
  type = 'bounce',
  showMinus = false,
  inputName
}) => {
  return (
    <label className={classNames(css.checkbox, css[type])}>
      <input
        name={inputName}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6" />
      </svg>
      {showMinus && <div className={css.checkboxMinus}>-</div>}
    </label>
  );
};

export default Checkbox;
