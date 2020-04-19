import React from 'react';
import TestAnswers from '../test-answers/TestAnswers';
import JumbleLetters from '../jumble-letters/JumbleLetters';
import TestWriting from '../writing/TestWriting';

type Props = {
  type: string;
};

const VARIANTS_REPETITION = 'variants';
const JUMBLING_REPETITION = 'jumbling';
const WRITING_REPETITION = 'writing';

const WordsTrainerRepetitionChooser: React.FC<Props> = ({
  type,
  ...restProps
}) => {
  const chooseContent = (): any => {
    switch (type) {
      case VARIANTS_REPETITION: {
        return <TestAnswers {...restProps} />;
      }

      case JUMBLING_REPETITION: {
        return <JumbleLetters {...restProps} />;
      }

      case WRITING_REPETITION: {
        return <TestWriting {...restProps} />;
      }

      default:
        break;
    }
  };

  return <>{chooseContent()}</>;
};

export default WordsTrainerRepetitionChooser;
