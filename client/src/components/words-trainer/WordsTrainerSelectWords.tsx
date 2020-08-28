import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './scss/select-words.module.scss';

import { RootState } from '../../reducers/index';
import { getRandomItems } from '../../utils/helpers';
import { Word } from '../../types/wordsList';
import { setRepetitionData } from '../../actions/wordsRepetitionActions';

import WordsTrainerNoWords from './WordsTrainerNoWords';
import Checkbox from '../ui/Checkbox';

type Params = {
  order: WordsOrder;
  filter: FilterWords;
  number: number;
};

enum WordsOrder {
  CreatedDateAsc = 1,
  CreatedDateDesc = 2,
  Random = 3
}

enum FilterWords {
  All = 1,
  Bookmarks = 2
}

const MIN_WORDS_REPETITION_LENGTH = 4;

const WordsTrainerSelectWords = () => {
  const allWords = useSelector((state: RootState) => state.wordList.words);
  const [startRepetitionError, setStartRepetitionError] = useState('');
  const [params, setParams] = useState<Params>({
    order: WordsOrder.CreatedDateAsc,
    filter: FilterWords.All,
    number: MIN_WORDS_REPETITION_LENGTH
  });

  const dispatch = useDispatch();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    const value = e.target.value;
    const isValueNumber = re.test(value);

    if (value === '' || isValueNumber) {
      setParams(state => ({
        ...state,
        number: Number(value)
      }));
    }
  };

  const handleFilterChange = (value: FilterWords) => {
    setParams(state => ({
      ...state,
      filter: value
    }));
  };

  const handleOrderChange = (value: WordsOrder) => {
    setParams(state => ({
      ...state,
      order: value
    }));
  };

  const getWordsByParams = (): Word[] => {
    let words: Word[] = [];
    let filteredWords = [...allWords];

    if (params.filter === FilterWords.Bookmarks) {
      filteredWords = filteredWords.filter(({ bookmarks }) => bookmarks);
    }

    if (params.number > filteredWords.length) {
      return words;
    }

    if (params.order === WordsOrder.CreatedDateAsc) {
      words = filteredWords.slice(0, params.number);
    }

    if (params.order === WordsOrder.CreatedDateDesc) {
      words = filteredWords.slice(-params.number).reverse();
    }

    if (params.order === WordsOrder.Random) {
      words = getRandomItems(filteredWords, params.number);
    }

    return words;
  };

  const handleStartRepetition = () => {
    const readyToRepetitionWords = getWordsByParams();

    if (readyToRepetitionWords.length < MIN_WORDS_REPETITION_LENGTH) {
      setStartRepetitionError(
        'Not enough words by current params (Min 4). Please update params or add new words.'
      );

      return;
    }

    const wordsIds = readyToRepetitionWords.map(({ id }) => id);
    dispatch(setRepetitionData(wordsIds));
  };

  if (!allWords.length) {
    return <WordsTrainerNoWords />;
  }

  return (
    <div className={css.wrapper}>
      <span className={css.title}>
        You can start the repetition in two ways:
      </span>

      <div className={css.row}>
        <div className={css.column}>
          <span className={css.columnTitle}>From the dictionary</span>

          <button className={css.button}>Go to the dictionary</button>
        </div>
        <div className={css.column}>
          <span className={css.columnTitle}>With params</span>

          <div className={css.params}>
            <div className={css.paramsBlock}>
              <span className={css.paramsLabel}>Filter words</span>
              <div className={css.paramsGroup}>
                <div className="form__group form__group--checkbox">
                  <Checkbox
                    inputName="bookmarks"
                    onChange={() => handleFilterChange(FilterWords.All)}
                    checked={params.filter === FilterWords.All}
                  />
                  <span className="form__group__label">All</span>
                </div>
                <div className="form__group form__group--checkbox">
                  <Checkbox
                    inputName="bookmarks"
                    onChange={() => handleFilterChange(FilterWords.Bookmarks)}
                    checked={params.filter === FilterWords.Bookmarks}
                  />
                  <span className="form__group__label">Bookmarks only</span>
                </div>
              </div>
            </div>

            <div className={css.paramsBlock}>
              <span className={css.paramsLabel}>Words order</span>
              <div className={css.paramsGroup}>
                <div className="form__group form__group--checkbox">
                  <Checkbox
                    inputName="bookmarks"
                    onChange={() =>
                      handleOrderChange(WordsOrder.CreatedDateAsc)
                    }
                    checked={params.order === WordsOrder.CreatedDateAsc}
                  />
                  <span className="form__group__label">Created date (asc)</span>
                </div>
                <div className="form__group form__group--checkbox">
                  <Checkbox
                    inputName="bookmarks"
                    onChange={() =>
                      handleOrderChange(WordsOrder.CreatedDateDesc)
                    }
                    checked={params.order === WordsOrder.CreatedDateDesc}
                  />
                  <span className="form__group__label">
                    Created date (desc)
                  </span>
                </div>

                <div className="form__group form__group--checkbox">
                  <Checkbox
                    inputName="bookmarks"
                    onChange={() => handleOrderChange(WordsOrder.Random)}
                    checked={params.order === WordsOrder.Random}
                  />
                  <span className="form__group__label">Random</span>
                </div>
              </div>
            </div>

            <div className={css.paramsBlock}>
              <span className={css.paramsLabel}>Number of words</span>
              <div className={css.paramsGroup}>
                <div className="form__group form__group--field">
                  <input
                    type="text"
                    name="NumberOfWords"
                    placeholder="Enter the number of words for the repetition"
                    onChange={handleNumberChange}
                    value={params.number}
                  />
                </div>
              </div>
            </div>

            <button className={css.button} onClick={handleStartRepetition}>
              Start the repetition
            </button>

            {startRepetitionError && (
              <p className={css.paramsError}>{startRepetitionError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordsTrainerSelectWords;
