import React from 'react';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';

import TestWriting from './TestWriting';
import { IWrapperChildren } from '../../../types/wordsRepetition';

import { wordsList } from '../../../mocks/repetitionData';

describe('<TestWriting />', () => {
  const props: IWrapperChildren = {
    type: 'variants',
    lang: 'ru',
    wordId: 1,
    wordsList,
    handleCompleteTest: () => {}
  };

  it('Check if user can`t complete the test with an empty value', () => {
    render(<TestWriting {...props} />);

    fireEvent.click(screen.getByTestId('complete-button'));
    expect(screen.queryByTestId('answer')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('input'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('complete-button'));
    expect(screen.queryByTestId('answer')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: '      ' }
    });

    fireEvent.click(screen.getByTestId('complete-button'));
    expect(screen.queryByTestId('answer')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: '' }
    });

    screen.getByTestId('input').focus();
    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13
    });

    expect(screen.queryByTestId('answer')).not.toBeInTheDocument();
  });

  it('Check if user can complete the test by enter key', () => {
    render(<TestWriting {...props} />);

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'some value' }
    });

    fireEvent.keyDown(document.activeElement || document.body, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13
    });

    expect(screen.queryByTestId('answer')).toBeInTheDocument();
  });

  it('Check if user can`t write anything after test is completed', () => {
    render(<TestWriting {...props} />);

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'some value' }
    });
    fireEvent.click(screen.getByTestId('complete-button'));

    expect(screen.getByTestId('input')).toBeDisabled();
  });

  it('Test if user can see the right answer', () => {
    const rightAnswerId = 1;
    const rightAnswerData = props.wordsList[rightAnswerId];

    render(<TestWriting {...props} wordId={rightAnswerId} lang="en" />);

    fireEvent.change(screen.getByTestId('input'), {
      target: { value: 'some value' }
    });

    fireEvent.click(screen.getByTestId('complete-button'));

    expect(screen.queryByTestId('answer')).toBeInTheDocument();
    expect(screen.queryByTestId('answer')?.childNodes[0].textContent).toBe(
      rightAnswerData.en
    );
    expect(screen.queryByTestId('answer')?.childNodes[1].textContent).toBe(
      rightAnswerData.ru
    );
  });
});
