/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from '../scss/listening-voices.module.scss';
import AmericaFlagIcon from '../../../assets/icons/AmericaFlagIcon';
import BritainFlagIcon from '../../../assets/icons/BritainFlagIcon';
import classNames from 'classnames/bind';

const getFlagIconByCountry = country => {
  switch (country) {
    case 'UK':
      return <BritainFlagIcon />;

    case 'US':
      return <AmericaFlagIcon />;

    default:
      return '';
  }
};

const ListeningVoicesSpeaker = ({
  name,
  icon,
  country,
  activeVoice,
  voice,
  handleVoiceChange
}) => {
  return (
    <li
      className={classNames(styles.speaker, {
        [styles.active]: activeVoice === voice
      })}
      onClick={() => handleVoiceChange(voice)}
    >
      <div className={styles.speakerFlag}>{getFlagIconByCountry(country)}</div>
      <div className={styles.speakerIcon}>{icon}</div>
      <span className={styles.speakerName}>{name}</span>
    </li>
  );
};

export default ListeningVoicesSpeaker;
