import * as types from 'types';

export function clearTyping() {
  return {
    type: types.CLEAR_TYPING
  };
}

export function addBookQuery(data) {
  return {
    type: types.ADD_BOOK_QUERY,
    payload: data
  };
}

export function invalidSource(data) {
  return {
    type: types.INVALID_SOURCE,
    payload: data
  };
}

export function typing(data) {
  return (dispatch) => {
    const { source, value } = data;
    switch(source) {
    case 'addBookQuery' :
      return dispatch(addBookQuery(value));
    default: 
      return dispatch(invalidSource(source));
    }
  };
}