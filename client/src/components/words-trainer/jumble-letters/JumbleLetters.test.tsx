import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import JumbleLetters, { shuffleLetters } from './JumbleLetters';
import { IWrapperChildren } from '../../../types/wordsRepetition';

describe('<JumbleLetters/>', () => {
  const TESTING_WORD_EN = 'log';
  const TESTING_WORD_RU = 'журнал';

  const props: IWrapperChildren = {
    type: 'variants',
    lang: 'en',
    wordId: 22,
    wordsList: {
      '22': {
        examples: {
          ru: 'пример',
          en: 'example'
        },
        association: '',
        transcription: '',
        bookmarks: false,
        en: TESTING_WORD_EN,
        ru: TESTING_WORD_RU,
        id: 22,
        repetition: 3
      }
    },
    handleCompleteTest: () => {}
  };

  it('Composing a word from given letters. Test word - "log"', async () => {
    render(<JumbleLetters {...props} />);

    const testLetterButtonsLength = async (letter: string, length: number) => {
      const letterButtons = await screen.getAllByTestId(
        'jumbling-letters-list-btn'
      );
      const nextLetterBtn = letterButtons.find(el => el.textContent === letter);

      fireEvent.click(nextLetterBtn);

      //TODO - find out why this is not working
      // fireEvent.keyDown(document.body, {
      //   key: letter,
      //   keyCode: `Key${letter.toUpperCase()}`
      // });

      if (letterButtons.length > 1) {
        expect(
          await screen.getAllByTestId('jumbling-letters-list-btn')
        ).toHaveLength(length);
      } else {
        expect(
          screen.getByTestId('jumbling-letters-list').firstChild
        ).toBeNull();
      }
    };

    await testLetterButtonsLength('g', 3);
    await testLetterButtonsLength('l', 2);
    await testLetterButtonsLength('o', 1);
    await testLetterButtonsLength('g', 0);

    const letterButtons = screen.getAllByTestId('jumbling-letters-block-btn');

    expect(letterButtons).toHaveLength(3);
    expect(letterButtons[0].textContent).toBe('l');
    expect(letterButtons[1].textContent).toBe('o');
    expect(letterButtons[2].textContent).toBe('g');
  });
});

describe('functions', () => {
  it('shuffleLetters', () => {
    const expected1 = [expect.stringMatching(/^h/)];

    const expected2 = [
      expect.stringMatching(/^l/),
      expect.stringMatching(/^a/),
      expect.stringMatching(/^r/),
      expect.stringMatching(/^g/),
      expect.stringMatching(/^e/)
    ];

    const expected3 = [
      expect.stringMatching(/^t/),
      expect.stringMatching(/^w/),
      expect.stringMatching(/^o/),
      expect.stringMatching(/^w/),
      expect.stringMatching(/^o/),
      expect.stringMatching(/^r/),
      expect.stringMatching(/^d/),
      expect.stringMatching(/^s/)
    ];

    expect(shuffleLetters('h')).toEqual(expect.arrayContaining(expected1));

    expect(shuffleLetters('large')).toEqual(expect.arrayContaining(expected2));
    expect(shuffleLetters('egral')).toEqual(expect.arrayContaining(expected2));
    expect(shuffleLetters('rgela')).toEqual(expect.arrayContaining(expected2));

    expect(shuffleLetters('two words')).toEqual(
      expect.arrayContaining(expected3)
    );
  });
});
