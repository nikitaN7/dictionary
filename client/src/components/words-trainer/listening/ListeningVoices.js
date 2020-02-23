import React, { useState, useEffect } from 'react';
import styles from '../scss/listening-voices.module.scss';
import ListeningVoicesBtn from './ListeningVoicesBtn';
import ListeningVoicesList from './ListeningVoicesList';
import { speakerList } from '../../../data/speakerList';

const INITIAL_VOICE = 'UK English Male';

const ListeningVoices = ({ word = 'survey' }) => {
  const [activeVoice, setActiveVoice] = useState(INITIAL_VOICE);

  const voicePlay = voice => {
    window.responsiveVoice.speak(word, voice);
  };

  const handleVoiceChange = voice => {
    setActiveVoice(voice);
    voicePlay(voice);
  };

  // useEffect(() => {
  //   voicePlay(INITIAL_VOICE);
  // }, []);

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
