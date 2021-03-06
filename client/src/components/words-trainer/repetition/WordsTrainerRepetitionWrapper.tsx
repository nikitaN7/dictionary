import React, { useState, useEffect, useCallback } from 'react';

import WordsTrainerTaskComplete from '../WordsTrainerTaskComplete';
import WordsTrainerWord from '../WordsTrainerWord';
import ListeningVoices from '../listening/ListeningVoices';

import wordsRepetitionTypes from '../../../data/wordsRepetitionTypes';
import {
  IQueue,
  IRepetitionType,
  IWrapperChildren,
  IWordsList,
  WordId,
  TypeId,
  ITestInfo
} from '../../../types/wordsRepetition';

import css from '../scss/repetition.module.scss';

type Props = {
  children: (props: IWrapperChildren) => React.ReactNode;
  typeId: TypeId;
  wordId: WordId;
  queue: IQueue[];
  queueIdx: number;
  wordsList: IWordsList;
  handleNextTestClick: (completedTestInfo: ITestInfo) => void;
};

type NewProps = {
  title: string;
};

const initialCompletedTestInfo = {
  hasErrors: false,
  errorNumbers: 0
};

const WordsTrainerRepetitionTitle: React.FC<NewProps> = ({ title }) => {
  return (
    <div className={css.title}>
      <span className={css.titleText}>{title}</span>
    </div>
  );
};

const WordsTrainerRepetitionWrapper: React.FC<Props> = ({
  children,
  typeId,
  wordId,
  wordsList,
  handleNextTestClick = () => {}
}) => {
  const [completedTestInfo, setCompletedTestInfo] = useState<ITestInfo>(
    initialCompletedTestInfo
  );
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [currentType, setCurrentType] = useState<IRepetitionType | null>(null);
  const [trainerWord, setTrainerWord] = useState<string>('');

  const handleUserKeyPress = useCallback(
    event => {
      event.preventDefault();

      const ENTER_KEY_CODE = 13;
      const { keyCode } = event;

      if (keyCode === ENTER_KEY_CODE && isTestCompleted) {
        handleNextTestClick(completedTestInfo);
      }
    },
    [isTestCompleted, completedTestInfo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    const currentType = wordsRepetitionTypes.find(
      (type: IRepetitionType) => type.typeId === typeId
    );

    if (currentType) {
      setCurrentType(currentType);
    }

    setTrainerWord(() => {
      if (wordId && currentType) {
        const currentWord = wordsList[wordId];

        if (currentType.lang === 'ru' || currentType.speakers) {
          return currentWord.en;
        }

        return currentWord.ru;
      }

      return '';
    });
  }, [typeId, wordId]);

  useEffect(() => {
    setIsTestCompleted(false);
    setCompletedTestInfo(initialCompletedTestInfo);
  }, [typeId, wordId]);

  const handleCompleteTest = (testInfo: ITestInfo) => {
    setCompletedTestInfo(testInfo);
    setIsTestCompleted(true);
  };

  const renderRepetitionContent = () => {
    if (currentType) {
      return children({
        type: currentType!.name,
        lang: currentType!.lang,
        wordId,
        wordsList,
        handleCompleteTest
      });
    }

    return null;
  };

  return (
    <div className={css.wrapper}>
      {currentType && <WordsTrainerRepetitionTitle title={currentType.title} />}

      {currentType && currentType.name !== 'writing' && (
        <WordsTrainerWord word={trainerWord} />
      )}
      {currentType && currentType.speakers && (
        <ListeningVoices word={trainerWord} />
      )}

      {renderRepetitionContent()}

      {isTestCompleted && (
        <WordsTrainerTaskComplete
          onNextTestClick={() => handleNextTestClick(completedTestInfo)}
          examples={wordId ? wordsList[wordId].examples : {}}
        />
      )}
    </div>
  );
};

export default WordsTrainerRepetitionWrapper;
