import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import data from 'tests/data/books';
import * as actions from 'actions/books';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Book Actions', () => {
  describe('Thunk action creators', () => {
    let sandbox;

    const { resData, testActions, bookObj, reqData } = data;

    const initialState = {
      books: {
        search: {
          addBook: {
            totalItems: 3,
            data: [bookObj, {...bookObj, altId: 'dafsdvred'}]
          },
          findBook: {}
        },
        viewing: {
          index: 0,
          page: 'addBook',
          lastOfSet: 2
        }
      },
      input: {
        addBook: {
          inauthor: 'Orwell',
          intitle: '1984'
        }
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        testActions.getBookRequest,
        testActions.getNewBookSuccess
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({
        status: 200, 
        data: resData
      }));

      const store = mockStore(initialState);
      store.dispatch(actions.getBook(0, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches request and failed actions when status is not 200', done => {
      const expectedActions = [
        testActions.getBookRequest,
        testActions.getBookFailure
      ];

      sandbox.stub(axios, 'get').returns(Promise.reject({status: 404}));

      const store = mockStore(initialState);
      store.dispatch(actions.getBook(0 , true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches a getNextBook action when the next index is less than the books in the dataset' , done => {
      const expectedActions = [
        testActions.getNextBook
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.changeBook(1));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('dispatches a getBookRequest and getBookSuccess actions when nextIndex is greater than the books in the dataset', done => {
      const expectedActions = [
        testActions.getBookRequest,
        testActions.getBookSuccess
      ];

      sandbox.stub(axios, 'get').returns(Promise.resolve({
        status: 200, 
        data: resData
      }));

      const store = mockStore(initialState);
      store.dispatch(actions.changeBook(2))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches a postBookRequest and postBookSuccess actions when the status is 200', done => {
      const expectedActions = [
        testActions.postBookRequest,
        testActions.postBookSuccess
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({
        status: 200,
        data: bookObj
      }));

      const store = mockStore(initialState);
      store.dispatch(actions.postBook())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

    it('dispatches a postBookRequest and postBookFailure actions when the status is not 200', done => {
      const expectedActions = [
        testActions.postBookRequest,
        testActions.postBookFailure
      ];

      sandbox.stub(axios, 'post').returns(Promise.reject({status: 500}));

      const store = mockStore(initialState);
      store.dispatch(actions.postBook())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done)
        .catch(done);
    });

  });

  describe('Action creator unit tests', () => {
    let sandbox;

    const { resData, testActions, bookObj, reqData } = data;

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // esline-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should create an action when making a getBook request', () => {
      expect(actions.getBookRequest(reqData)).toEqual(testActions.getBookRequest);
    });

    it('should create an action when an old search query finds additional books in the database', () => {
      expect(actions.getBookSuccess(testActions.getBookSuccess.payload)).toEqual(testActions.getBookSuccess);
    });

    it('should create an action when a new search query finds books in the database', () => {
      expect(actions.getNewBookSuccess(testActions.getNewBookSuccess.payload)).toEqual(testActions.getNewBookSuccess);
    });

    it('should create an action when a get search query fails', () => {
      expect(actions.getBookFailure(testActions.getBookFailure.payload)).toEqual(testActions.getBookFailure);
    });

    it('should create an action when a request is made to retrieve the next book', () => {
      expect(actions.getNextBook(testActions.getNextBook.payload)).toEqual(testActions.getNextBook);
    });

    it('should create an action when a request is made for a user to add a book', () => {
      expect(actions.postBookRequest(testActions.postBookRequest.payload)).toEqual(testActions.postBookRequest);
    });

    it('should create an action when a book is successfully added to the database', () => {
      expect(actions.postBookSuccess(testActions.postBookSuccess.payload)).toEqual(testActions.postBookSuccess);
    });

    it('should create an action when a book fails to be added to the database', () => {
      expect(actions.postBookFailure(testActions.postBookFailure.payload)).toEqual(testActions.postBookFailure);
    });

    it('should create an action when a request is made to clear the results of their previous search', () => {
      expect(actions.clearResults(testActions.clearResults.payload)).toEqual(testActions.clearResults);
    });

  });
});