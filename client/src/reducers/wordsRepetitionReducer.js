import * as actions from '../actions/actions';

const initialState = {
  queue: [],
  words: {}
};

const wordsRepetitionReducer = (state = initialState, action) => {
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
