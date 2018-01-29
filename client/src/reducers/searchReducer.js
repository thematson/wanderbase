import { FETCH_SEARCH } from '../actions/types';

export default function(state = [], action) {
  console.log(action.payload);
  console.log(this);
  switch (action.type) {
    case FETCH_SEARCH:
      return action.payload;
    default:
      return state;
  }
}