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
  };
};

const clientReducer = combineReducers({
  multiBook
});

export default clientReducer;