import React from 'react';
import SpeakerIcon from '../../../assets/icons/SpeakerIcon';
import styles from '../scss/listening-voices.module.scss';

type Props = {
  onClick(): void;
};

const ListeningVoicesBtn: React.FC<Props> = ({ onClick }) => {
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
