import { LOGIN } from '../actions/playerAction';
import { RESET_STATE } from '../actions/resetState';
import { SCORE } from '../actions/scoreAction';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  case RESET_STATE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
