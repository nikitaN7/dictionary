import React from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesSpeaker from './ListeningVoicesSpeaker';

const ListeningVoicesList = ({ handleVoiceChange, activeVoice, speakers }) => {
  return (
    <ul className={styles.speakers}>
      {speakers.map(speaker => {
        return (
          <ListeningVoicesSpeaker
            name={speaker.name}
            handleVoiceChange={handleVoiceChange}
            voice={speaker.desc}
            activeVoice={activeVoice}
            icon={speaker.icon}
            country={speaker.country}
          />
        );
      })}
    </ul>
  );
};

export default ListeningVoicesList;
