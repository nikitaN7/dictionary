import React from 'react';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';

import WordsTrainerRepetition from './WordsTrainerRepetition';
import { IQueue, IWordsList } from '../../../types/wordsRepetition';

import { wordsList } from '../../../mocks/repetitionData';

type Props = {
  wordsData: {
    queue: IQueue[];
    words: IWordsList;
  };
};

describe('<WordsTrainerRepetition />', () => {
  const props: Props = {
    wordsData: {
      queue: [
        {
          id: 1,
          type: 1
        },
        {
          id: 2,
          type: 1
        },
        {
          id: 3,
          type: 1
        },
        {
          id: 4,
          type: 1
        }
      ],
      words: wordsList
    }
  };

  it('Finish the repetition in 16 steps (4 words * 4 exercises), without wrong answers', () => {
    render(<WordsTrainerRepetition {...props} />);

    fireEvent.click(screen.getByText(wordsList[1].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[2].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[3].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[4].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.click(screen.getByText(wordsList[1].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[2].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[3].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[4].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    wordsList[1].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    wordsList[2].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    wordsList[3].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    wordsList[4].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[1].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[2].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[3].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[4].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    screen.getByTestId('repetition-completed');
  });

  it('Test ability to rehearse word after mistake.', () => {
    render(<WordsTrainerRepetition {...props} />);

    //error answer
    fireEvent.click(screen.getByText(wordsList[2].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[2].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[3].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[4].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    expect(screen.queryByTestId('speakerList')).not.toBeInTheDocument;

    //do mistake again
    fireEvent.click(screen.getByText(wordsList[2].en));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.click(screen.getByText(wordsList[2].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[3].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.click(screen.getByText(wordsList[4].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.click(screen.getByText(wordsList[1].ru));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    wordsList[2].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    wordsList[3].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    wordsList[4].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    ///////////////////////////////////////////////////////////

    wordsList[1].en.split('').forEach(letter => {
      fireEvent.click(
        screen.getAllByText(letter, {
          selector: 'button'
        })[0]
      );
    });

    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[2].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[3].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[4].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    /////////////////////////////////////////////////////////////

    fireEvent.change(screen.getByTestId('input'), {
      target: {
        value: wordsList[1].en
      }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    fireEvent.click(screen.getByTestId('next-test-button'));

    screen.getByTestId('repetition-completed');
  });
});
