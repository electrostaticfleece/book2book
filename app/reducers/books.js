import * as types from 'types';
import { combineReducers } from 'redux';

const data = (
  state = [],
  action
) => {
  switch(action.type) {
    case types.GET_BOOK_SUCCESS:
      return [...state, ...action.payload.data];
    case types.GET_NEW_BOOK_SUCCESS:
      return action.payload.data;
    default: 
      return state;
  };
};

const requests = (
  state = {},
  action
  ) => {
  switch(action.type) {
    case types.GET_BOOK_REQUEST:
    case types.POST_BOOK_REQUEST:
      return {
        ...state, 
        status: 'Requested'
      };
    case types.GET_BOOK_FAILURE: 
    case types.POST_BOOK_FAILURE:
      return {
        ...state, 
        status: 'Failed'
      };
    case types.GET_BOOK_SUCCESS: 
    case types.GET_NEW_BOOK_SUCCESS:
      return {
        ...state, 
        status: 'Success', 
        data: data(state.data, action),
        totalItems: action.payload.totalItems 
      };
    case types.CLEAR_RESULTS: 
      return {};
    default: 
      return state;
  };
};

const search = (
  state = {
    addBook: {},
    findBook: {}
  },
  action
) => {
  switch(action.type) {
    case types.GET_BOOK_REQUEST:
    case types.GET_BOOK_FAILURE:
    case types.GET_BOOK_SUCCESS:
    case types.GET_NEW_BOOK_SUCCESS:
    case types.CLEAR_RESULTS:
      return {
        ...state, 
        addBook: requests(state.addBook, action)
      };
    default:
      return state;
  };
};

const viewing = (
  state = {
    id: null,
    index: null,
    page: null
  },
  action
) => {
  switch(action.type) {
    case types.GET_BOOK_SUCCESS:
    case types.GET_NEW_BOOK_SUCCESS:
      return {
        ...state, 
        id: action.payload.data[0].altId, 
        index: action.payload.index, 
        page: 'addBook',
        lastOfSet: action.payload.lastOfSet,
      };
    case types.GET_NEXT_BOOK:
      return {
        ...state, 
        id: action.payload.id, 
        index: action.payload.index
      };
    default: 
      return state;
  };
};

const booksReducer = combineReducers({
  search,
  viewing
});

export default booksReducer;