import * as types from 'types';
import { combineReducers } from 'redux';

const title = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.TITLE_INPUT:
      return action.payload;
    default: 
      return state;
  }
};

const author = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.AUTHOR_INPUT:
      return action.payload;
    default: 
      return state;
  };
};

const addBook = (
  state = {
    inauthor: '',
    intitle: ''
  },
  action
) => {
  switch(action.type) {
    case types.TITLE_INPUT:
      return {...state, intitle: title(state.title, action)};
    case types.AUTHOR_INPUT:
      return {...state, inauthor: author(state.author, action)};
    case types.CLEAR_TYPING: {
      return {inauthor: '', intitle: ''};
    }
    default: 
      return state;
  };
};

const inputReducer = combineReducers({
  addBook
});

export default inputReducer;