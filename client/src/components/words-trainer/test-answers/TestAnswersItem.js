import React from 'react';
import styles from '../scss/test-answers.module.scss';
import classNames from 'classnames/bind';

const TestAnswersItem = ({ answer, error, success, id, onClick }) => {
  return (
    <div
      className={classNames(
        styles.item,
        { [styles.success]: success },
        { [styles.error]: error }
      )}
    >
      <button className={styles.itemBtn} onClick={onClick}>
        <span className={styles.itemCount}>{id}</span>
        <span className={styles.itemText}>{answer}</span>
      </button>
    </div>
  );
};

export default TestAnswersItem;
