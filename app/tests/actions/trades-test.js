import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import { browserHistory } from 'react-router';
import expect from 'expect';
import * as types from 'types';
import * as actions from 'actions/trades';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Trade Actions', () => {
  describe('Thunk action creators', () => {
    let sandbox;

    const initialState = {
      user: {
        trades: {
          potential: {
            requestedBook: {
              altId: 23
            },
            userBook: {
              altId: 24
            }
          }
        },
        userId: 1
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('proposeTrade dispatches request and success actions when the status is 200', done => {
      const { user: { trades: { potential: { requestedBook, userBook } }, userId } } = initialState;
      const expectedActions = [
        {
          type: types.PROPOSE_TRADE_REQUEST,
          payload: {
            requestedbook: requestedBook.altId,
            decisionbook: userBook.altId,
            Books: [requestedBook, userBook],
            requestedby: userId,
            createdAt: null,
            status: 'pending'
          }
        }, {
          type: types.PROPOSE_TRADE_SUCCESS,
          payload: { 
            test: true,
            Books: [requestedBook, userBook]
          } 
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ 
        status: 200,
        data: {
          trade: {
            meta: {test: true},
            requestedBook,
            userBook
          }
        }
      }));
      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore(initialState);
      store.dispatch(actions.proposeTrade(null))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
          .catch(done);
    });

    it('proposeTrade dispatches request and failure actions when the status is not 200', done => {
      const { user: { trades: { potential: { requestedBook, userBook } }, userId } } = initialState;
      const expectedActions = [
        {
          type: types.PROPOSE_TRADE_REQUEST,
          payload: {
            requestedbook: requestedBook.altId,
            decisionbook: userBook.altId,
            Books: [requestedBook, userBook],
            requestedby: userId,
            createdAt: null,
            status: 'pending'
          }
        }, {
          type: types.PROPOSE_TRADE_FAILURE,
          payload: {
            status: 500
          }
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.reject({ status: 500 }));
      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore(initialState);
      store.dispatch(actions.proposeTrade(null))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
          .catch(done);
    });

    it('changeStatus dispatches update and success actions when the http status is 200 and the trade status is allowed', done => {
      const expectedActions = [
        {
          type: types.UPDATE_STATUS,
          payload: {
            status: 'pending',
            tradeID: 1
          }
        }, {
          type: types.GET_ALL_TRADES_SUCCESS,
          payload: [{altId: 15}]
        }
      ];

      sandbox.stub(axios, 'put').returns(Promise.resolve({ status: 200, data: {trades: [{altId: 15}]}}));

      const store = mockStore(initialState);
      store.dispatch(actions.changeStatus({tradeID: 1}, 'pending'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
          .catch(done);
    });

    it('changeStatus dispatches two update actions when the http status is not 200 and the trade status is allowed', done => {
      const expectedActions = [
        {
          type: types.UPDATE_STATUS,
          payload: {
            status: 'accepted',
            tradeID: 1
          }
        }, {
          type: types.UPDATE_STATUS,
          payload: {
            status: 'pending',
            tradeID: 1
          }
        }
      ];

      sandbox.stub(axios, 'put').returns(Promise.reject({ status: 500 }));

      const store = mockStore(initialState);
      store.dispatch(actions.changeStatus({tradeID: 1}, 'accepted'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
          .catch(done);
    });

    it('changeStatus dispatches no actions when the status is not allowed', done => {
      const expectedActions = [];

      const store = mockStore(initialState);
      store.dispatch(actions.changeStatus({tradeID: 1}, 'nonsense'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});