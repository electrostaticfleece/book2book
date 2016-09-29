import configureStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as types from 'types';
import * as actions from 'actions/users';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  user: {
    userInfo: {
      firstName: 'Bob',
      lastName: 'Dobolina',
      city: 'New York',
      state: 'New York'
    }
  }
};

describe('User Actions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create(); // eslint-disable-line
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('dispatches a single updateInfo action when the status is 200', done => {
    const expectedActions = [
      {
        type: types.UPDATE_INFO,
        payload: {
          firstName: 'Rob'
        }
      }
    ];

    sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200 }));

    const store = mockStore(initialState);
    store.dispatch(actions.updateSettings({firstName: 'Rob'}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }).then(done)
      .catch(done);
  });

  it('dispatches a multiple updateInfo action when the status is NOT 200', done => {
    const expectedActions = [
      {
        type: types.UPDATE_INFO,
        payload: {
          firstName: 'Rob'
        }
      }, {
        type: types.UPDATE_INFO,
        payload: initialState.user.userInfo
      }
    ];

    sandbox.stub(axios, 'put').returns(Promise.reject({ status: 500 }));

    const store = mockStore(initialState);
    store.dispatch(actions.updateSettings({firstName: 'Rob'}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }).then(done)
      .catch(done);
  });
});