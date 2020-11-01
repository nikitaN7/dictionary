import React from 'react';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';

import TestAnswers from '../test-answers/TestAnswers';
import { IWrapperChildren } from '../../../types/wordsRepetition';

import { wordsList } from '../../../mocks/repetitionData';

describe('<TestAnswers />', () => {
  const props: IWrapperChildren = {
    type: 'variants',
    lang: 'ru',
    wordId: 1,
    wordsList,
    handleCompleteTest: () => {}
  };

  const newProps = {...props};


  it('Check if the proposed answers are ru lang', () => {
    render(<TestAnswers {...props} lang="ru" />)

    const ruWords = Object.values(wordsList).map(({ru}) => ru);

    const answersTextList = screen.getAllByText(new RegExp(`${ruWords.join("|")}`));

    expect(answersTextList).toHaveLength(4);
    expect(answersTextList.map(item => item.textContent)).toEqual(expect.arrayContaining(ruWords))
  })

  it('Check if the proposed answers are en lang', () => {
    render(<TestAnswers {...props} lang="en" />)

    const enWords = Object.values(wordsList).map(({en}) => en);

    const answersTextList = screen.getAllByText(new RegExp(`${enWords.join("|")}`));

    expect(answersTextList).toHaveLength(4);

  })

  it('Click on the right answer', () => {
    const rightAnswerId = 1;
    const rightAnswerData = props.wordsList[rightAnswerId];

    render(<TestAnswers {...props} wordId={rightAnswerId} lang="en" />)

    fireEvent.click(screen.getByText(rightAnswerData.en));

    expect(screen.queryByTestId('test-answer-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('test-answer-success').textContent).toBe(rightAnswerData.en)

    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    })
  })


  it('Click on the wrong answer', async () => {
    const rightAnswerId = 1;
    const rightAnswerData = props.wordsList[rightAnswerId];

    const wrongAnswerId = 2;
    const wrongAnswerData = props.wordsList[wrongAnswerId];

    render(<TestAnswers {...newProps} wordId={rightAnswerId} lang="en" />)

    await waitFor(() => fireEvent.click(screen.getByText(wrongAnswerData.en)))

    expect(screen.queryByTestId('test-answer-error')).toBeInTheDocument();
    expect(screen.getByTestId('test-answer-error').textContent).toBe(wrongAnswerData.en);

    expect(screen.queryByTestId('test-answer-success')).toBeInTheDocument();
    expect(screen.getByTestId('test-answer-success').textContent).toBe(rightAnswerData.en);

    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    })
  })

  it('Click on the right answer from the keyboard', async () => {
    const rightAnswerId = 1;
    const rightAnswerData = props.wordsList[rightAnswerId];

    render(<TestAnswers {...props} wordId={rightAnswerId} lang="en" />)

    const rightAnswerKey = screen.getByText(rightAnswerData.en).parentNode?.textContent[0].toString();

    fireEvent.keyDown(screen.getByText(rightAnswerData.en), { key: rightAnswerKey })

    expect(screen.queryByTestId('test-answer-error')).not.toBeInTheDocument();
    expect(screen.getByTestId('test-answer-success').textContent).toBe(rightAnswerData.en)

    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toBeDisabled();
    })
  })
})