import React from 'react';
import SpeakerIcon from '../../../assets/icons/SpeakerIcon';
import styles from '../scss/listening-voices.module.scss';

const ListeningVoicesBtn = ({ onClick }) => {
  return (
    <div className={styles.play}>
      <button className={styles.playBtn} onClick={onClick}>
        <SpeakerIcon />
        <span>Space</span>
      </button>
    </div>
  );
};

export default ListeningVoicesBtn;
