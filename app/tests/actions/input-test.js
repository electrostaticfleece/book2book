import configureStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as types from 'types';
import * as actions from 'actions/input';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Input Actions', () => {
  it('dispatches a clearTyping action', done => {
    const expectedActions = [{
      type: types.CLEAR_TYPING
    }];

    const store = mockStore({});
    store.dispatch(actions.clearTyping());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches an addBookQuery action when the source is addBookQuery', done => {
    const expectedActions = [{
      type: types.ADD_BOOK_QUERY,
      payload: 'test'
    }];

    const store = mockStore({});
    store.dispatch(actions.typing({source: 'addBookQuery', value: 'test'}));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches an invalidSource action when the source is not addBookQuery', done => {
    const expectedActions = [{
      type: types.INVALID_SOURCE,
      payload: 'notAddBookQuery'
    }];

    const store = mockStore({});
    store.dispatch(actions.typing({source: 'notAddBookQuery', value: 'test'}));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});