import React from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesBtn from './ListeningVoicesBtn';
import ListeningVoicesList from './ListeningVoicesList';

const ListeningVoices = () => {
  return (
    <div className={styles.wrapper}>
      <ListeningVoicesBtn />
      <ListeningVoicesList />
    </div>
  );
};

export default ListeningVoices;
