import React from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesSpeaker from './ListeningVoicesSpeaker';
import BritishManIcon from '../../../assets/icons/BritishManIcon';
import BritishWomanIcon from '../../../assets/icons/BritishWomanIcon';
import AmericanManIcon from '../../../assets/icons/AmericanManIcon';
import AmericanWomanIcon from '../../../assets/icons/AmericanWomanIcon';

const speakerList = [
  {
    desc: 'UK English Male',
    icon: <BritishManIcon />,
    name: 'Peter',
    country: 'UK'
  },
  {
    desc: 'UK English Female',
    icon: <BritishWomanIcon />,
    name: 'Susan',
    country: 'UK'
  },
  {
    desc: 'USA English Female',
    icon: <AmericanManIcon />,
    name: 'Bob',
    country: 'US'
  },
  {
    desc: 'USA English Female',
    icon: <AmericanWomanIcon />,
    name: 'Monica',
    country: 'US'
  }
];

const ListeningVoicesList = () => {
  return (
    <ul className={styles.speakers}>
      {speakerList.map(speaker => {
        return (
          <ListeningVoicesSpeaker
            name={speaker.name}
            icon={speaker.icon}
            country={speaker.country}
          />
        );
      })}
    </ul>
  );
};

export default ListeningVoicesList;
