import { combineReducers } from 'redux';
import user from 'reducers/user';
import books from 'reducers/books';
import input from 'reducers/input';
import client from 'reducers/client';
import { routerReducer as routing } from 'react-router-redux';
// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  input,
  books,
  routing,
  client
});

export default rootReducer;