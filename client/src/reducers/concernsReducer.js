import { FETCH_MATCHES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MATCHES:
      return action.payload;
    default:
      return state;
  }
}