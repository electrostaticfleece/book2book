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
    case types.VIEW_SINGLE_BOOK:
    case types.GET_AVAILABLE_BOOKS_SUCCESS:
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
    case types.GET_AVAILABLE_BOOKS_REQUEST:
      return {
        ...state, 
        status: 'Requested'
      };
    case types.GET_BOOK_FAILURE: 
    case types.POST_BOOK_FAILURE:
    case types.GET_AVAILABLE_BOOKS_FAILURE:
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
        totalItems: action.payload.totalItems,
        lastQuery: action.payload.query
      };
    case types.VIEW_SINGLE_BOOK:
      return {
        ...state,
        status: 'Success',
        totalItems: 1,
        data: data(state.data, action)
      };
    case types.GET_AVAILABLE_BOOKS_SUCCESS:
      return {
        ...state,
        status: 'Success',
        totalItems: action.payload.length,
        data: data(state.data, action)
      }
    case types.CLEAR_RESULTS: 
      return {};
    default: 
      return state;
  };
};

const search = (
  state = {
    addBook: {},
    findBook: {},
    viewBook: {}
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
    case types.VIEW_SINGLE_BOOK:
      return {
        ...state,
        viewBook: requests(state.viewBook, action)
      };
    case types.GET_AVAILABLE_BOOKS_REQUEST:
    case types.GET_AVAILABLE_BOOKS_SUCCESS:
    case types.GET_AVAILABLE_BOOKS_FAILURE:
      return {
        ...state,
        findBook: requests(state.findBook, action)
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
    case types.VIEW_SINGLE_BOOK: 
      return {
        id: action.payload.data[0].altId,
        index: 0,
        page: 'viewBook'
      }
    default: 
      return state;
  };
};

const booksReducer = combineReducers({
  search,
  viewing
});

export default booksReducer;