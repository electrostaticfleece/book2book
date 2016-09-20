import * as types from 'types';
import { combineReducers } from 'redux';

const addBookQuery = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.ADD_BOOK_QUERY:
      return action.payload;
    case types.CLEAR_TYPING:
      return '';
    default: 
      return state;
  };
};

const inputReducer = combineReducers({
  addBookQuery
});

export default inputReducer;