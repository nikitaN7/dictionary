import React, { useState, useEffect } from 'react';
import { IQueue } from '../interfaces';
import WordsTrainerRepetitionWrapper from './WordsTrainerRepetitionWrapper';
import WordsTrainerRepetitionChooser from './WordsTrainerRepetitionChooser';

type Props = {
  wordsData: {
    queue: IQueue[];
    words: any;
  };
};

const WordsTrainerRepetition: React.FC<Props> = ({ wordsData }) => {
  const [queue, setQueue] = useState<IQueue[]>([]);
  const [typeId, setTypeId] = useState<number | string>(1);
  const [queueIdx, setQueueIdx] = useState<number>(0);
  const [wordsList, setWordsList] = useState<any>({});
  const [wordId, setWordId] = useState<number | null | string>(null);

  useEffect(() => {
    setQueue(wordsData.queue);
    setTypeId(wordsData.queue[0].type);

    const wordId = wordsData.queue[0].id;
    const findWords = wordsData.words || null;

    setWordId(wordsData.queue[0].id);

    if (findWords) {
      setWordsList(findWords);
    }
  }, [wordsData]);

  return (
    <WordsTrainerRepetitionWrapper
      typeId={typeId}
      wordId={wordId}
      queue={queue}
      queueIdx={queueIdx}
      wordsList={wordsList}
    >
      {(props: any) => <WordsTrainerRepetitionChooser {...props} />}
    </WordsTrainerRepetitionWrapper>
  );
};

export default WordsTrainerRepetition;
