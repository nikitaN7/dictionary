import React, { useState, useEffect, useLayoutEffect } from 'react';
import { IQueue, IRepetitionType } from '../interfaces';
import WordsTrainerWord from '../WordsTrainerWord';
import ListeningVoices from '../listening/ListeningVoices';
import wordsRepetitionTypes from '../../../data/wordsRepetitionTypes';
import css from '../scss/repetition.module.scss';

type Props = {
  children: any;
  typeId: number | string;
  wordId: number | null | string;
  queue: IQueue[];
  queueIdx: number;
  wordsList: any;
  handleNextTestClick: (completedTestInfo: TestInfo) => void;
};

type NewProps = {
  title: string;
};

type TestInfo = {
  hasErrors: boolean;
  errorNumbers: number;
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
  wordsList = [],
  handleNextTestClick = () => {}
}) => {
  const [completedTestInfo, setCompletedTestInfo] = useState<TestInfo>(
    initialCompletedTestInfo
  );
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [currentType, setCurrentType] = useState<IRepetitionType | null>(null);
  const [trainerWord, setTrainerWord] = useState<string>('');

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

        if (currentType.lang === 'ru') {
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

  const handleCompleteTest = (testInfo: any) => {
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
        <button onClick={() => handleNextTestClick(completedTestInfo)}>
          Continue
        </button>
      )}
    </div>
  );
};

export default WordsTrainerRepetitionWrapper;
