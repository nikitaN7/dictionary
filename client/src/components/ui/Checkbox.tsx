import React from 'react';
import classNames from 'classnames/bind';
import css from './scss/checkbox.module.scss';

type Props = {
  checked?: boolean;
  onChange?(): void;
  type?: string;
  showMinus?: boolean;
};

const Checkbox: React.FC<Props> = ({
  checked = false,
  onChange = () => {},
  type = 'bounce',
  showMinus = false
}) => {
  return (
    <label className={classNames(css.checkbox, css[type])}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6" />
      </svg>
      {showMinus && <div className={css.checkboxMinus}>-</div>}
    </label>
  );
};

export default Checkbox;
