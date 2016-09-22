import * as types from 'types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { polyfill } from 'es6-promise';

polyfill();

//CONSTANTS

const googleConfig = {
  baseURL: 'https://www.googleapis.com', 
  timeout: 5000
};
const singleStatus = [''];
const singleNames = [
  'getNewBookSuccess', 
  'getNextBook', 
  'clearResults', 
  'resetView', 
  'viewSingleBook'
];
const requestStatuses = [
  'Request', 
  'Success', 
  'Failure'
];
const requestNames = [ 
  'getBook', 
  'deleteBook', 
  'postBook', 
  'getAvailableBooks' 
];
const pairs = [{
  actionNames: requestNames, 
  statuses: requestStatuses
} , {
  actionNames: singleNames,
  statuses: singleStatus
}];

//AUXILIARY FUNCTIONS

function formatAPIData(book, id) {
  return {
    title: book.title,
    authors: book.authors,
    categories: book.categories,
    description: book.description,
    image: book.imageLinks ? book.imageLinks.thumbnail.replace('zoom=1', 'zoom=2') : null,
    isbn: book.industryIdentifiers ? book.industryIdentifiers[0].identifier : null,
    altId: id
  };
}

function createAPIString(query, startIndex) {
  return ['/books/v1/volumes?q=', query, '&startIndex=', startIndex].join('');
}

function makeBookRequest(method, config, api = '/books') {
  return axios[method](api, config);
}

function underscoreLeft(string) {
  return '_' + string;
}

function createTypeName(statusName) {
  return statusName.replace(/[A-Z]/g, underscoreLeft).toUpperCase();
}

//Creates a function that will handle a request based on whether a status is equal to http status code. 

function createHandleRes(code, actionCreator) {
  return function(res) {
    if(res.status === code) {
      return actionCreator(res);
    }
  };
}

/*
 * Standardizes and simplifies requests by dispatching three actions that correspond
 * to the request lifecycle (optimistic, success, and failure). If additional dispatches 
 * are needed, simply wrap them in the function corresponding to the dispatch and return 
 * the final action creator that needs to be fired for that lifecycle function. 
 *
 * @dispatch: The dispatch from your thunk 
 * @optimistic: An optimistic action creator or function that returns an action creator 
 * to be fired before the request
 * @config: Configuration for your request. It must include a type. Options and 
 * and an api string are optional
 * @handleRes: An action creator or function that returns an action creator to be fired after
 * a response is recieved
 * @failire: An action creator of function that returns an action creator to be fired after
 * a response fails
 */

function handleRequests(dispatch, optimistic, config, handleRes, failure){

  dispatch(optimistic());

  if(handleRes && failure && config.type) {
    return makeBookRequest(config.type, config.options, config.api)
      .then((res) => {
        dispatch(handleRes(res));
      })
      .catch((err) => {
        dispatch(failure(err));
      });
  }
}

/*
 * Creates a generic action creator with a type and a payload. Types are uppercase with an 
 * underscore between words. The payload is a generic payload that references the data argument. 
 *
 * @status : The suffix you wish to append to the name of your action
 * @name : The name of your action 
 * @writeTo: The object actions will be written to
 * @types: The types object you wish to reference
 * @namingFunc: A function used to generate type names
 */

function createActionCreator(status, name, writeTo, types, namingFunc) {
  const statusName = name + status;
  const typeName = namingFunc(statusName);
  writeTo[statusName] = function(data) {
    return {
      type: types[typeName],
      payload: data
    };
  };
}

/*
 * Takes a pairing of actionNames and statuses and writes an action to the actions object for each 
 * status/action combination 
 *
 * @pairs : An object with two properties (both arrays) named actionNames & statuses
 * @actions: An object to write actions to. Defaults to an empty object
 */

function createActionCreators(pairs, actions = {}) {
  pairs.forEach((pair) => {
    const {actionNames, statuses} = pair;

    actionNames.forEach((name) => {

      statuses.forEach((status) => {
        createActionCreator(status, name, actions, types, createTypeName);
      });
    });
  });
  return actions;
}

//A necessary evil of optimization

export const { 
  getBookRequest, 
  getBookFailure, 
  getBookSuccess,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
  postBookRequest,
  postBookSuccess,
  postBookFailure,
  getAvailableBooksRequest,
  getAvailableBooksSuccess,
  getAvailableBooksFailure,
  getNewBookSuccess,
  getNextBook,
  clearResults,
  resetView,
  viewSingleBook
} = createActionCreators(pairs);

//THUNK ACTION CREATORS

export function getBook(startIndex = 0, newSearch = false) {
  return (dispatch, getState) => {
    const { input: { addBookQuery }, books } = getState();
    const query = startIndex > 0 ? books.search.addBook.lastQuery : addBookQuery;

    if(typeof startIndex === 'number' && typeof newSearch === 'boolean' && typeof query === 'string') {

      const successAction = newSearch ? getNewBookSuccess : getBookSuccess;
      const api = createAPIString(query, startIndex);
      const message = 'Unfortunately, your query failed. Please check your query and try again';

      const optimistic = () => getBookRequest(query);
      const config = {type: 'get', options: googleConfig, api};
      const handleResponse = (res) => {
        const {data: { items } } = res;
        const bookData = items.map((book) => {
          return formatAPIData(book.volumeInfo, book.id);
        });
        return successAction({
          data: bookData,
          totalItems: res.data.totalItems,
          lastOfSet: startIndex + items.length,
          index: startIndex,
          query: query
        });
      };
      const success = createHandleRes(200, handleResponse);
      const failure = () => getBookFailure({message, query});

      handleRequests(dispatch, optimistic, config, success, failure);
    }
  };
}

//Will get a book in a set based on the value of move or request the next set of books.

export function changeBook(move) {
  return (dispatch, getState) => {
    const { books: {viewing, search} } = getState();
    if(typeof move === 'number' && viewing && typeof viewing.index === 'number') {

      const data = search[viewing.page].data;
      const totalItems = search[viewing.page].totalItems;
      const nextIndex = viewing.index + move;

      if(nextIndex < data.length && nextIndex >= 0) {
        const id = data[nextIndex].altId;
        dispatch(getNextBook({index: nextIndex, id}));
      }

      if(nextIndex >= data.length && viewing.lastOfSet < totalItems) {
        return dispatch(getBook(viewing.lastOfSet));
      }
    }
  };
}

//Will get all available books in the database or will limit the request to a set number of books

export function getAvailableBooks(limit) {
  return (dispatch) => {
    const config = {type: 'get', options: {}, api: '/books/' + (limit || '')};
    const message = 'Unfortunately, we could not retrive any books from the database at this time.';

    const success = createHandleRes(200, (res) => getAvailableBooksSuccess({data: res.data.books}));
    const failure = () => getAvailableBooksFailure({message});

    return handleRequests(dispatch, getAvailableBooksRequest, config, success, failure);
  };
}

export function postBook() {
  return (dispatch, getState) => {
    const { books: { viewing, search: { addBook: { data } } }, user: { books }} = getState();

    const book = data[viewing.index];
    const message = 'Unfortunately we could not add your book because it\'s already in your collection or there was an error. Please try again';
    const inCollection = books.some((userBook) => userBook.altId === book.altId);
    const optimisticAction = inCollection ? postBookFailure(message) : postBookRequest(book);
    const config = {type: 'post', options: {data: book}};

    const optimistic = () => { browserHistory.push('/mybooks'); return optimisticAction; };
    const success = inCollection ? null : createHandleRes(200, () => postBookSuccess(book));
    const failure = inCollection ? null : () => postBookFailure({message, book, index: getState().user.books.lastIndexOf(book)});

    return handleRequests(dispatch, optimistic, config, success, failure);
  };
}

export function deleteBook(book) {
  return (dispatch, getState) => {
    const { user: { books } } = getState();

    if(typeof book.altId === 'string') {
      const bookIndex = books.lastIndexOf(book);
      const optimisticData = {data: book, index: bookIndex};
      const config = {type: 'delete', options: {data: book}};
      const message = 'Unfortunately, we could not delete your book. Please try again at a later time.';

      const optimistic = () => deleteBookRequest(optimisticData);
      const success = createHandleRes(200, () => deleteBookSuccess(book));
      const failure = () => deleteBookFailure({message, book});

      return handleRequests(dispatch, optimistic, config, success, failure);
    }

  };
}

//changes the view to display information about a single book

export function changeViewToSingle(data) {
  return (dispatch) => {
    const changeState = new Promise((resolve) => {
      dispatch(viewSingleBook([data]));
      resolve();
    });

    changeState.then(() => {
      browserHistory.push('/viewBook');
    })
    .catch(() => {
      console.log('Something went wrong with your request');
    });

  };
}