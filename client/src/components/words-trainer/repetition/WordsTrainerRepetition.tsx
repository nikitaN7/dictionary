import React, { useState, useEffect } from 'react';

import {
  IQueue,
  IWrapperChildren,
  IWordsList
} from '../../../types/wordsRepetition';

import WordsTrainerRepetitionWrapper from './WordsTrainerRepetitionWrapper';
import WordsTrainerRepetitionChooser from './WordsTrainerRepetitionChooser';

import { v4 as uuidv4 } from 'uuid';

type Props = {
  wordsData: {
    queue: IQueue[];
    words: IWordsList;
  };
};

type TestInfo = {
  hasErrors: boolean;
  errorNumbers: number;
};

type WordsError = {
  type: number | string;
  errors: number;
};

type WordsErrors = {
  [id: string]: WordsError[];
};

const WordsTrainerRepetition: React.FC<Props> = ({ wordsData }) => {
  const [queue, setQueue] = useState<IQueue[]>([]);
  const [typeId, setTypeId] = useState<number | string>(1);
  const [queueIdx, setQueueIdx] = useState<number>(0);
  const [wordsList, setWordsList] = useState<IWordsList>({});
  const [wordId, setWordId] = useState<number | null | string>(null);
  const [isRepetitionCompleted, setIsRepetitionCompleted] = useState(false);

  const [queueErrorsIdx, setQueueErrorsIdx] = useState<number[]>([]);
  const [wordsErrors, setWordsErrors] = useState<WordsErrors>({});

  useEffect(() => {
    const findWords = wordsData.words || null;

    if (findWords) {
      setWordsList(findWords);
    }

    setQueue(wordsData.queue);
  }, [wordsData]);

  useEffect(() => {
    if (queue.length > 0) {
      setTypeId(queue[0].type);

      const wordId = queue[0].id;
      setQueueIdx(0);
      setWordId(wordId);
    }

    setQueueErrorsIdx([]);
  }, [queue]);

  const updateQueue = (queueErrors: number[]) => {
    const updatedQueue: IQueue[] = [];
    const updatedWordsErrors: WordsErrors = { ...wordsErrors };
    const INITIAL_REPETITION_AMOUNT = 3;

    queue.forEach(({ id, type }, idx) => {
      const parseType = typeof type === 'string' ? parseInt(type) : type;
      const repetitionAmount =
        wordsList[id].repetition || INITIAL_REPETITION_AMOUNT;

      if (!queueErrors.includes(idx) && parseType < 4) {
        updatedQueue.push({
          id,
          type: parseType + 1,
          uniqId: uuidv4()
        });
        return;
      }

      if (queueErrors.includes(idx)) {
        let errorsNumber = 1;

        const alreadyHasErrors = Object.keys(updatedWordsErrors).includes(
          id.toString()
        );

        if (alreadyHasErrors) {
          const wordError = updatedWordsErrors[id];

          const currentTypeError = wordError.find(
            (error: WordsError) => error.type === parseType
          );

          if (currentTypeError) {
            const currentTypeErrorIdx = wordError.findIndex(
              (error: WordsError) => error.type === parseType
            );

            errorsNumber =
              currentTypeError.errors < repetitionAmount
                ? currentTypeError.errors + 1
                : currentTypeError.errors;

            updatedWordsErrors[id] = [
              ...wordError.slice(0, currentTypeErrorIdx),
              { type: parseType, errors: currentTypeError.errors + 1 },
              ...wordError.slice(currentTypeErrorIdx + 1)
            ];
          } else {
            updatedWordsErrors[id] = [
              ...updatedWordsErrors[id],
              { type: parseType, errors: 1 }
            ];
          }
        } else {
          updatedWordsErrors[id] = [{ type: parseType, errors: 1 }];
        }

        const nextType =
          errorsNumber >= repetitionAmount ? parseType + 1 : type;

        if (nextType < 5) {
          updatedQueue.push({
            id,
            type: nextType,
            uniqId: uuidv4()
          });
        }
      }
    });

    if (!updatedQueue.length) {
      setIsRepetitionCompleted(true);
    }

    setQueue(updatedQueue);
    setQueueIdx(0);
    setWordsErrors(updatedWordsErrors);
  };

  const handleNextTestClick = (completedTestInfo: TestInfo) => {
    const nextQueueIdx = queueIdx + 1;
    const nextQueue = queue[nextQueueIdx];
    const lastQueueIdx = queue.length - 1;

    const updatedQueueErrorsIdx = [...queueErrorsIdx];

    if (completedTestInfo.hasErrors) {
      setQueueErrorsIdx(state => {
        updatedQueueErrorsIdx.push(queueIdx);
        return [...state, queueIdx];
      });
    }

    if (nextQueueIdx > lastQueueIdx) {
      updateQueue(updatedQueueErrorsIdx);
      return;
    }

    setWordId(nextQueue.id);
    setQueueIdx(state => state + 1);
    setTypeId(nextQueue.type);
  };

  if (isRepetitionCompleted) {
    return <div data-testid="repetition-completed">Well done!</div>;
  }

  return (
    <WordsTrainerRepetitionWrapper
      typeId={typeId}
      wordId={wordId}
      queue={queue}
      queueIdx={queueIdx}
      wordsList={wordsList}
      handleNextTestClick={handleNextTestClick}
    >
      {(props: IWrapperChildren) => (
        <WordsTrainerRepetitionChooser
          {...props}
          queueId={queue[queueIdx].uniqId}
        />
      )}
    </WordsTrainerRepetitionWrapper>
  );
};

export default WordsTrainerRepetition;
