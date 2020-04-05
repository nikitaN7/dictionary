import React, { useState, useEffect } from 'react';
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
};

type NewProps = {
  title: string;
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
  wordsList
}) => {
  const [currentType, setCurrentType] = useState<IRepetitionType | null>(null);

  useEffect(() => {
    const currentType = wordsRepetitionTypes.find(
      (type: IRepetitionType) => type.typeId === typeId
    );

    if (currentType) {
      setCurrentType(currentType);
    }
  }, [typeId]);

  const renderRepetitionContent = () => {
    if (currentType) {
      return children({
        type: currentType!.name,
        lang: currentType!.lang,
        wordId,
        wordsList
      });
    }

    return null;
  };

  //wordId
  //wordsList

  return (
    <div className={css.wrapper}>
      {currentType && <WordsTrainerRepetitionTitle title={currentType.title} />}
      {currentType && currentType.name !== 'writing' && (
        <WordsTrainerWord word={'Some word'} />
      )}
      {currentType && currentType.speakers && <ListeningVoices />}

      {renderRepetitionContent()}
    </div>
  );
};

export default WordsTrainerRepetitionWrapper;
