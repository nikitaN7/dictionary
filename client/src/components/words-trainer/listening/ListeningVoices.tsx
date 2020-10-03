import React, { useState, useEffect } from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesBtn from './ListeningVoicesBtn';
import ListeningVoicesList from './ListeningVoicesList';
import { speakerList } from '../../../data/speakerList';

const INITIAL_VOICE = 'UK English Male';

type Props = {
  word: string;
};

declare global {
  interface Window {
    responsiveVoice: any;
  }
}

const ListeningVoices: React.FC<Props> = ({ word = '' }) => {
  const [activeVoice, setActiveVoice] = useState(INITIAL_VOICE);

  const voicePlay = (voice: string) => {
    window?.responsiveVoice?.speak?.(word, voice);
  };

  const handleVoiceChange = (voice: string) => {
    setActiveVoice(voice);
    voicePlay(voice);
  };

  useEffect(() => {
    setActiveVoice(INITIAL_VOICE);
    voicePlay(INITIAL_VOICE);
  }, [word]);

  const setNextVoice = () => {
    const { length } = speakerList;
    const findCurrentVoiceIdx = speakerList.findIndex(
      ({ desc }) => desc === activeVoice
    );
    let nextVoiceIdx = findCurrentVoiceIdx + 1;

    if (nextVoiceIdx >= length) {
      nextVoiceIdx = 0;
    }

    const nextVoice = speakerList[nextVoiceIdx].desc;
    setActiveVoice(nextVoice);
    voicePlay(nextVoice);
  };

  return (
    <div className={styles.wrapper}>
      <ListeningVoicesBtn onClick={setNextVoice} />
      <ListeningVoicesList
        speakers={speakerList}
        handleVoiceChange={handleVoiceChange}
        activeVoice={activeVoice}
      />
    </div>
  );
};

export default ListeningVoices;
