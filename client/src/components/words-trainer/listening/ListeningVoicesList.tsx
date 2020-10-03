import React from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesSpeaker from './ListeningVoicesSpeaker';

type Speaker = {
  desc: string;
  icon: React.ReactNode;
  name: string;
  country: string;
};

type Props = {
  handleVoiceChange(voice: string): void;
  activeVoice: string;
  speakers: Speaker[];
};

const ListeningVoicesList: React.FC<Props> = ({
  handleVoiceChange,
  activeVoice,
  speakers
}) => {
  return (
    <ul className={styles.speakers} data-testid="speakerList">
      {speakers.map(speaker => {
        return (
          <ListeningVoicesSpeaker
            key={speaker.name}
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
