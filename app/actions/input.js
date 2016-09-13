import * as types from 'types';

export function clearTyping() {
  return {
    type: types.CLEAR_TYPING
  };
};

export function titleInput(data) {
  return {
    type: types.TITLE_INPUT,
    payload: data
  };
};

export function authorInput(data) { 
  return {
    type: types.AUTHOR_INPUT,
    payload: data
  };
};

export function invalidSource(data) {
  return {
    type: types.INVALID_SORUCE,
    payload: data
  };
};

export function typing(data) {
  return (dispatch, getState) => {
    const { source, value } = data;
    switch(source) {
      case 'Title' :
        return dispatch(titleInput(value));
      case 'Author':
        return dispatch(authorInput(value));
      default: 
        return dispatch(invalidSource(source));
    };
  };
};

export function clearTyping(data) {
  return {
    type: types.CLEAR_TYPING,
    payload: data
  };
};