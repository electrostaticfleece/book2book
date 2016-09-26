import * as types from 'types';
import { combineReducers } from 'redux';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
  case types.TOGGLE_LOGIN_MODE:
    return !state;
  default:
    return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
  case types.TOGGLE_LOGIN_MODE:
  case types.MANUAL_LOGIN_USER:
  case types.SIGNUP_USER:
  case types.LOGOUT_USER:
  case types.LOGIN_SUCCESS_USER:
  case types.SIGNUP_SUCCESS_USER:
    return '';
  case types.LOGIN_ERROR_USER:
  case types.SIGNUP_ERROR_USER:
    return action.message;
  default:
    return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
  case types.MANUAL_LOGIN_USER:
  case types.SIGNUP_USER:
  case types.LOGOUT_USER:
    return true;
  case types.LOGIN_SUCCESS_USER:
  case types.SIGNUP_SUCCESS_USER:
  case types.LOGOUT_SUCCESS_USER:
  case types.LOGIN_ERROR_USER:
  case types.SIGNUP_ERROR_USER:
  case types.LOGOUT_ERROR_USER:
    return false;
  default:
    return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
  case types.LOGIN_SUCCESS_USER:
  case types.SIGNUP_SUCCESS_USER:
  case types.LOGOUT_ERROR_USER:
    return true;
  case types.LOGIN_ERROR_USER:
  case types.SIGNUP_ERROR_USER:
  case types.LOGOUT_SUCCESS_USER:
    return false;
  default:
    return state;
  }
};

const books = (
  state = [],
  action
) => {
  switch(action.type) {
  case types.POST_BOOK_REQUEST:
    return [...state, action.payload];
  case types.DELETE_BOOK_REQUEST:
  case types.POST_BOOK_FAILURE:
    return state.filter((book) => book.altId !== action.payload.book.altId);
  case types.DELETE_BOOK_FAILURE:
    return [...state, action.payload.book];
  case types.POST_BOOK_SUCCESS:
  default:
    return state;
  }
};

const status = (
  state = 'pending',
  action
) => {
  switch(action.type) {
  case types.UPDATE_STATUS:
    return action.payload.status;
  default: 
    return state;
  }
};

const existing = (
  state = [],
  action
) => {
  switch(action.type) {
  case types.GET_ALL_TRADES_SUCCESS:
    return action.payload;
  case types.PROPOSE_TRADE_SUCCESS:
    return [...state, action.payload];
  case types.UPDATE_STATUS:
    return state.map((trade) => {
      return trade.tradeID === action.payload.tradeID ? {...trade, status: status(trade.status, action)} : {...trade};
    });
  default:
    return state;
  }
};

const potential = (
  state = {},
  action
) => {
  switch(action.type) {
  case types.SELECT_REQUESTED_BOOK:
    return {...state, requestedBook: action.payload};
  case types.SELECT_USER_BOOK:
    return {...state, userBook: action.payload};
  case types.PROPOSE_TRADE_REQUEST:
    return {...state, status: 'Requested'};
  case types.PROPOSE_TRADE_FAILURE:
    return {...state, status: 'Failed'};
  case types.PROPOSE_TRADE_SUCCESS:
    return {};
  default: 
    return state;
  }
};

const trades = (
  state = {
    potential: {},
    existing: []
  },
  action
) => {
  switch(action.type) {
  case types.SELECT_REQUESTED_BOOK:
  case types.SELECT_USER_BOOK:
  case types.PROPOSE_TRADE_REQUEST:
  case types.PROPOSE_TRADE_FAILURE:
    return {...state, potential: potential(state.potential, action)};
  case types.UPDATE_STATUS:
    return {...state, existing: existing(state.existing, action)};
  case types.PROPOSE_TRADE_SUCCESS:
    return {potential: potential(state.potential, action), existing: existing(state.existing, action)};
  default:
    return state;
  }
};

const userId = (
  state = null,
  action
) => {
  switch(action.type) {
  default:
    return state;
  }
};

const info = (
  state = {},
  action
) => {
  const keys = Object.keys(action.payload);
  return keys.reduce((prev, next) => {
    prev[next] = action.payload[next];
    return prev;
  }, {...state});
};

const userInfo = (
  state = {},
  action
) => {
  switch(action.type) {
  case types.UPDATE_INFO:
    return info(state, action);
  default:
    return state;
  }
};

const userReducer = combineReducers({
  userInfo,
  userId,
  isLogin,
  isWaiting,
  authenticated,
  message,
  books,
  trades
});

export default userReducer;