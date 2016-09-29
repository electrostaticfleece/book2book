import * as types from 'types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { polyfill } from 'es6-promise';
import { createHandleRes, createRequestHandler, createActionCreators } from 'actions/auxiliary';

polyfill();

//CONSTANTS

const googleConfig = {
  baseURL: 'https://www.googleapis.com', 
  timeout: 5000
};
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
  statuses: ['']
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

//Instantiate our request handler. 

const handleRequests = createRequestHandler(makeBookRequest);

//Export all of our non async actions

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
} = createActionCreators(pairs, {}, types);

//THUNK ACTION CREATORS

export function getBook(startIndex = 0, newSearch = false) {
  return (dispatch, getState) => {
    const { input: { addBookQuery }, books } = getState();
    const query = startIndex > 0 ? books.search.addBook.lastQuery : addBookQuery;

    if(typeof startIndex === 'number' && typeof newSearch === 'boolean' && typeof query === 'string') {

      const successAction = newSearch ? getNewBookSuccess : getBookSuccess;
      const api = createAPIString(query, startIndex);
      const message = 'Unfortunately, your query failed. Please check your query and try again';
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

      const optimistic = () => getBookRequest(query);
      const success = createHandleRes(200, handleResponse);
      const failure = () => getBookFailure({message, query});
      return handleRequests(dispatch, optimistic, config, success, failure);
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
        return dispatch(getNextBook({index: nextIndex, id}));
      }

      if(nextIndex >= data.length && viewing.lastOfSet < totalItems) {
        return dispatch(getBook(viewing.lastOfSet));
      }
    }
  };
}

//Will get all available books in the database or will limit the request to a set number of books

export function getAvailableBooks(limit = 20, offset = 0) {
  return (dispatch) => {
    const config = {type: 'get', options: {}, api: '/books/' + (limit || '') + '/' + offset};
    const message = 'Unfortunately, we could not retrive any books from the database at this time.';

    const success = createHandleRes(200, (res) => { return getAvailableBooksSuccess({data: res.data.books});});
    const failure = () => { return getAvailableBooksFailure({message}); };

    return handleRequests(dispatch, getAvailableBooksRequest, config, success, failure);
  };
}

export function postBook() {
  return (dispatch, getState) => {
    const { books: { viewing, search: { addBook: { data } } }, user: { books }} = getState();

    const book = data[viewing.index];
    const message = 'Unfortunately we could not add your book because it\'s already in your collection or there was an error. Please try again';
    const inCollection = books.some((userBook) => userBook.altId === viewing.id);
    const optimisticAction = inCollection ? postBookFailure(message) : postBookRequest(book);
    const config = {type: 'post', options: {data: book}};

    const optimistic = () => { browserHistory.push('/mybooks'); return optimisticAction; };
    const success = inCollection ? null : createHandleRes(200, () => postBookSuccess(book));
    const failure = inCollection ? null : () =>  postBookFailure({message, book});

    return handleRequests(dispatch, optimistic, config, success, failure);
  };
}

export function deleteBook(book) {
  return dispatch => {

    if(typeof book.altId === 'string') {
      const optimisticData = {book};
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

    return changeState.then(() => {
      browserHistory.push('/viewBook');
    })
    .catch(() => {
      console.log('Something went wrong with your request');
    });

  };
}