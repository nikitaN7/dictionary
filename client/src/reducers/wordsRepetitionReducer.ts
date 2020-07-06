import * as actions from '../actions/actions';
import {
  WordsRepetitionState,
  RepetitionActionTypes
} from '../types/wordsRepetition';

const initialState: WordsRepetitionState = {
  queue: [],
  words: {}
};

const wordsRepetitionReducer = (
  state = initialState,
  action: RepetitionActionTypes
): WordsRepetitionState => {
  switch (action.type) {
    case actions.SET_REPETITION_DATA: {
      const { data } = action.payload;

      return {
        queue: data.queue,
        words: data.words
      };
    }

    default:
      return state;
  }
};

export default wordsRepetitionReducer;
