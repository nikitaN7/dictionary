import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ListeningVoices from './ListeningVoices';

describe('<ListeningVoices/>', () => {
  const TESTING_WORD_EN = 'log';

  it('Test speaker changing on speaker click', async () => {
    render(<ListeningVoices word={TESTING_WORD_EN} />);

    const speakerList = screen.getByTestId('speakerList');
    const lastSpeakerIdx = 3;
    const lastSpeaker = speakerList?.children[lastSpeakerIdx];

    expect(speakerList?.children).toHaveLength(4);

    fireEvent.click(lastSpeaker);

    expect(screen.getByTestId('activeSpeaker')).toEqual(lastSpeaker);
  });

  it('Test speaker changing on play button click', async () => {
    render(<ListeningVoices word={TESTING_WORD_EN} />);

    const speakerList = screen.getByTestId('speakerList');
    const secondSpeakerIdx = 1;
    const secondSpeaker = speakerList?.children[secondSpeakerIdx];

    expect(speakerList?.children).toHaveLength(4);

    fireEvent.click(screen.getByTestId('playButton'));

    expect(screen.getByTestId('activeSpeaker')).toEqual(secondSpeaker);
  });
});
