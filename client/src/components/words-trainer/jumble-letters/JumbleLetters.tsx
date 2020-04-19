import React, { useState, useEffect } from 'react';
import css from '../scss/jumble-letters.module.scss';
import JumbleLettersBlock from './JumbleLettersBlock';
import JumbleLettersList from './JumbleLettersList';

const shuffleLetters = (word: string) => {
  const allLetters = word.replace(/\s/g, '').split('');

  for (let i = allLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLetters[j], allLetters[i]] = [allLetters[i], allLetters[j]];
  }

  return allLetters;
};

type TestInfo = {
  hasErrors: boolean;
  errorNumbers: number;
};

type Props = {
  wordsList?: any;
  wordId?: number;
  lang?: string;
  handleCompleteTest?(testInfo: TestInfo): void;
};

const JumbleLetters: React.FC<Props> = ({
  handleCompleteTest = () => {},
  wordsList = [],
  wordId,
  lang = 'en'
}) => {
  const [enteredLetters, setEnteredLetters] = useState<string[]>([]);
  const [remainingLetters, setRemainingLetters] = useState<string[]>([]);
  const [currentWordText, setCurrentWordText] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [errorsNumbers, setErrorsNumbers] = useState<number>(0);

  const resetState = () => {
    setEnteredLetters([]);
    setRemainingLetters([]);
    setErrorsNumbers(0);
    setHasError(false);
  };

  useEffect(() => {
    if (!wordId || !wordsList) {
      return;
    }

    resetState();

    const currentWord = wordsList[wordId];
    setCurrentWordText(currentWord[lang]);
  }, [wordId, wordsList, lang]);

  useEffect(() => {
    if (currentWordText.length > 0) {
      const updatedLetters = shuffleLetters(currentWordText);
      setRemainingLetters(updatedLetters);
    }
  }, [currentWordText]);

  const getNextLetter = () => {
    const wordWithoutSpaces = currentWordText.replace(/\s/g, '').split('');
    const nextLetter = wordWithoutSpaces[enteredLetters.length];

    return nextLetter || '';
  };

  const showError = () => {
    setHasError(false);
    setHasError(true);

    setTimeout(() => {
      setHasError(false);
    }, 1000);
  };

  const onLetterClick = (letter: string, idx: number) => {
    const nextLetter = getNextLetter();

    if (letter !== nextLetter) {
      setErrorsNumbers(state => state + 1);
      showError();
      return;
    }

    setRemainingLetters(state => {
      const remainingLetters = [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];

      if (remainingLetters.length === 0) {
        const testInfo = {
          hasErrors: errorsNumbers > 0,
          errorNumbers: errorsNumbers
        };

        handleCompleteTest(testInfo);
      }

      return remainingLetters;
    });

    setEnteredLetters(state => [...state, letter]);
  };

  return (
    <div className={css.wrapper}>
      <JumbleLettersBlock
        letters={enteredLetters}
        word={currentWordText}
        hasError={hasError}
      />
      <JumbleLettersList letters={remainingLetters} onClick={onLetterClick} />
    </div>
  );
};

export default JumbleLetters;
