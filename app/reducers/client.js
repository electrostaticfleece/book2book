import * as types from 'types';
import { combineReducers } from 'redux';

const multiBook = (
  state = {
    width: 1200,
    mounted: false
  },
  action
) => {
  switch(action.type) {
  case types.MOUNT_MULTIBOOK:
    return {...state, mounted: action.payload};
  case types.MULTIBOOK_WIDTH_CHANGE:
    return {...state, width: action.payload};
  default:
    return state;
  }
};

const noLoad = (
  state = false,
  action
) => {
  switch(action.type) {
  case types.POST_BOOK_REQUEST:
  case types.PROPOSE_TRADE_REQUEST:
    return true;
  case types.POST_BOOK_SUCCESS:
  case types.POST_BOOK_FAILURE:
  case types.PROPOSE_TRADE_SUCCESS:
  case types.PROPOSE_TRADE_FAILURE:
    return false;
  default:
    return state;
  }
};

const clientReducer = combineReducers({
  noLoad,
  multiBook
});

export default clientReducer;