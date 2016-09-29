import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import { browserHistory } from 'react-router';
import expect from 'expect';
import data from 'tests/data/books';
import * as types from 'types';
import * as actions from 'actions/books';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const { googleRes, formattedGoogleRes, serverRes } = data;

describe('Book Actions', () => {
  describe('Thunk action creators', () => {
    let sandbox;

    const defaultState = {
      books: {
        search: {
          addBook: {},
          findBook: {},
          viewBook: {}
        },
        viewing: {
          id: null,
          index: null,
          page: null
        }
      },
      input: {
        addBookQuery: ''
      }
    };

    const initialState = {
      books: {
        search: {
          addBook: {
            status: 'Success',
            data: formattedGoogleRes.data,
            totalItems: googleRes.totalItems,
            lastQuery: 'Brave New World'
          },
          findBook: {
            status: 'Success',
            data: serverRes.books
          },
          viewBook: {}
        },
        viewing: {
          id: formattedGoogleRes.data[0].altId,
          index:0,
          lastOfSet: formattedGoogleRes.lastOfSet,
          page: 'addBook',
        }
      },
      input: {
        addBookQuery: 'Brave New World'
      },
      user: {
        books: [
          serverRes.books[0], serverRes.books[1]
        ]
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('getBook dispatches request and success actions when the status is 200', done => {
      const expectedActions = [
        {
          type: types.GET_BOOK_REQUEST,
          payload: 'Brave New World'
        }, {
          type: types.GET_NEW_BOOK_SUCCESS,
          payload: formattedGoogleRes
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({ status: 200, data: googleRes }));

      const store = mockStore(initialState);
      store.dispatch(actions.getBook(0, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('getBook dispatches request and failure actions when the status is not 200', done => {
      const expectedActions = [
        {
          type: types.GET_BOOK_REQUEST,
          payload: 'Brave New World'
        }, {
          type: types.GET_BOOK_FAILURE,
          payload: {
            message: 'Unfortunately, your query failed. Please check your query and try again',
            query: 'Brave New World'
          }
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.reject({ status: 500 }));

      const store = mockStore(initialState);
      store.dispatch(actions.getBook(0, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);

    });

    it('changeBook dispatches a getNextBook request if the next book\'s index is greater than zero and less than the length of the books set.', done => {
      const expectedActions = [
        {
          type: types.GET_NEXT_BOOK,
          payload: {
            index: 1,
            id: formattedGoogleRes.data[1].altId
          }
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.changeBook(1));
      expect(store.getActions()).toEqual(expectedActions);
      done();

    });

    it('changeBook dispatches getBookRequst and a getBookSuccess actions if the next books index is greater than the length of the book set, but less than the total items', done => {
      const { books, books: { viewing} } = initialState;
      const { data, totalItems } = formattedGoogleRes;
      const expectedActions = [
        {
          type: types.GET_BOOK_REQUEST,
          payload: 'Brave New World'
        }, {
          type: types.GET_BOOK_SUCCESS,
          payload: {
            data,
            totalItems,
            lastOfSet: viewing.lastOfSet + data.length,
            index: 10,
            query: 'Brave New World'
          }
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({ status: 200, data: googleRes }));

      const store = mockStore({...initialState, books: {...books, viewing: {...viewing, index: 9}}});
      store.dispatch(actions.changeBook(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('changeBook does not dispatch any actions if the value of lastOfSet is equal to the set\'s total length', done => {
      const { books, books: { viewing} } = initialState;
      const expectedActions = [];

      const store = mockStore({...initialState, books: {...books, viewing: {...viewing, index: 1059, lastOfSet: 1059}}});
      store.dispatch(actions.changeBook(1))
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('changeBook does not dispatch any actions if the nextIndex is less than zero', done => {
      const expectedActions = [];

      const store = mockStore(initialState);
      store.dispatch(actions.changeBook(-1))
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('getAvailableBooks dispatches a request and success actions when the status is 200', done => {
      const expectedActions = [
        {
          type: types.GET_AVAILABLE_BOOKS_REQUEST,
          payload: undefined
        }, {
          type: types.GET_AVAILABLE_BOOKS_SUCCESS,
          payload: {
            data: serverRes.books
          }
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({status: 200, data: {books: serverRes.books}}));

      const store = mockStore(initialState);
      store.dispatch(actions.getAvailableBooks())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('getAvailableBooks dispatches request and failure actions when the status is not 200', done => {
      const expectedActions = [
        {
          type: types.GET_AVAILABLE_BOOKS_REQUEST,
          payload: undefined
        }, {
          type: types.GET_AVAILABLE_BOOKS_FAILURE,
          payload: {
            message: 'Unfortunately, we could not retrive any books from the database at this time.',
          }
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.reject({ status: 500 }));

      const store = mockStore(initialState);
      store.dispatch(actions.getAvailableBooks())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('getAvailableBooks dispatches request and success actions when firstFire is set to true and findBooks is empty', done => {
      const expectedActions = [
        {
          type: types.GET_AVAILABLE_BOOKS_REQUEST,
          payload: undefined
        }, {
          type: types.GET_AVAILABLE_BOOKS_SUCCESS,
          payload: {
            data: serverRes.books
          }
        }
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({status: 200, data: {books: serverRes.books}}));

      const store = mockStore(defaultState);
      store.dispatch(actions.getAvailableBooks(20, 0, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('getAvailableBooks does not dispatch any actions when firstFire is true and findBooks contains a book set', done => {
      const expectedActions = [];

      const store = mockStore(initialState);
      store.dispatch(actions.getAvailableBooks(20, 0, true))
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('postBook dispatches request and success actions when the status is 200', done => {
      const expectedActions = [
        {
          type: types.POST_BOOK_REQUEST,
          payload: formattedGoogleRes.data[0]
        }, {
          type: types.POST_BOOK_SUCCESS,
          payload: formattedGoogleRes.data[0]
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));
      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore(initialState);
      store.dispatch(actions.postBook())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('postBook dispatches request and failure actions when a book is already in the user\'s collection', done => {
      const { books: {viewing: { id }, viewing}, books } = initialState;
      const expectedActions = [
        {
          type: types.POST_BOOK_FAILURE,
          payload: 'Unfortunately we could not add your book because it\'s already in your collection or there was an error. Please try again'
        }
      ];

      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore({...initialState, books: {...books, viewing: {...viewing, id: serverRes.books[0].altId}}} );
      store.dispatch(actions.postBook());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('postBook dispatches request and failure actions when the status is not 200', done => {
      const expectedActions = [
        {
          type: types.POST_BOOK_REQUEST,
          payload: formattedGoogleRes.data[0]
        }, {
          type: types.POST_BOOK_FAILURE,
          payload: {
            message: 'Unfortunately we could not add your book because it\'s already in your collection or there was an error. Please try again',
            book: formattedGoogleRes.data[0]
          }
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.reject({ status: 500 }));
      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore(initialState)
      store.dispatch(actions.postBook())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteBook dispatches request and success actions when the status is 200', done => {
      const expectedActions = [
        {
          type: types.DELETE_BOOK_REQUEST,
          payload: {
            book: serverRes.books[0]
          }
        }, {
          type: types.DELETE_BOOK_SUCCESS,
          payload: serverRes.books[0]
        }
      ];

      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState)
      store.dispatch(actions.deleteBook(serverRes.books[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('deleteBook dispatches request and failure actions when the status is not 200', done => {
      const expectedActions = [
        {
          type: types.DELETE_BOOK_REQUEST,
          payload: {
            book: serverRes.books[0]
          }
        }, {
          type: types.DELETE_BOOK_FAILURE,
          payload: {
            message: 'Unfortunately, we could not delete your book. Please try again at a later time.',
            book: serverRes.books[0]
          }
        }
      ];

      sandbox.stub(axios, 'delete').returns(Promise.reject({ status: 500 }));

      const store = mockStore(initialState)
      store.dispatch(actions.deleteBook(serverRes.books[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches a viewSingleBook action', done => {
      const expectedActions = [
        {
          type: types.VIEW_SINGLE_BOOK,
          payload: [serverRes.books[0]]
        }
      ];

      sandbox.stub(browserHistory, 'push').returns(null);

      const store = mockStore(initialState);
      store.dispatch(actions.changeViewToSingle(serverRes.books[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });
  });
});