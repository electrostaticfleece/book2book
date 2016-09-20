import * as types from 'types';
import { browserHistory } from 'react-router'
import axios from 'axios';

//CONSTANTS

const googleConfig = {
  baseURL: 'https://www.googleapis.com', 
  timeout: 5000
};

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
};

function createAPIString(query, startIndex) {
  return ['/books/v1/volumes?q=', query, '&startIndex=', startIndex].join('');
};

function makeBookRequest(method, config, api = '/books') {
  return axios[method](api, config);
};

//GET BOOK ACTION CREATORS

export function getBookRequest(data) {
  return {
    type: types.GET_BOOK_REQUEST,
    payload: data
  };
};

export function getBookSuccess(data) {
  return {
    type: types.GET_BOOK_SUCCESS,
    payload: data
  };
};

export function getNewBookSuccess(data) {
  return {
    type: types.GET_NEW_BOOK_SUCCESS,
    payload: data
  };
};

export function getBookFailure(data) {
  return {
    type: types.GET_BOOK_FAILURE,
    payload: data
  };
};

export function getNextBook(data) {
  return {
    type: types.GET_NEXT_BOOK,
    payload: data
  };
};

//DELETE BOOK REQUEST ACTION CREATORS

export function deleteBookRequest(data) {
  return {
    type: types.DELETE_BOOK_REQUEST,
    payload: data
  };
};

export function deleteBookSuccess(data) {
  return {
    type: types.DELETE_BOOK_SUCCESS,
    payload: data
  };
};

export function deleteBookFailure(data) {
  return {
    type: types.DELETE_BOOK_FAILURE,
    payload: data
  };
};

//POST BOOK ACTION CREATORS

export function postBookRequest(data) {
  return {
    type: types.POST_BOOK_REQUEST,
    payload: data
  };
};

export function postBookSuccess(data) {
  return {
    type: types.POST_BOOK_SUCCESS,
    payload: data
  };
};

export function postBookFailure(data) {
  return {
    type: types.POST_BOOK_FAILURE,
    payload: data
  };
};

//VIEW BOOK ACTION CREATOR

export function viewSingleBook(data) {
  return {
    type: types.VIEW_SINGLE_BOOK,
    payload: {
      data: data
    }
  };
};


//THUNK ACTION CREATORS

export function getBook(startIndex = 0, newSearch = false) {
  return (dispatch, getState) => {
    const { input: { addBookQuery }, books } = getState();
    const query = startIndex > 0 ? books.search.addBook.lastQuery : addBookQuery;

    if(typeof startIndex === 'number' && typeof newSearch === 'boolean' && typeof query === 'string') {

      const successAction = newSearch ? getNewBookSuccess : getBookSuccess;
      const api = createAPIString(query, startIndex);

      dispatch(getBookRequest(query));

      return makeBookRequest('get', googleConfig, api)
        .then(res => {
          if(res.status === 200) {
            const { data: { items } } = res;
            const bookData = items.map((book) => {
              return formatAPIData(book.volumeInfo, book.id);
            });

            dispatch(successAction({
              data: bookData, 
              totalItems: res.data.totalItems,
              lastOfSet: startIndex + items.length,
              index: startIndex,
              query: query
            }));

          } 
        })
        .catch((err) => {
          dispatch(getBookFailure({
            message: 'Unfortunately, your query failed. Please check your query and try again', 
            query: addBook
          }));
        });
    }
  };
};

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
};

export function postBook() {
  return (dispatch, getState) => {
    const { books: { viewing, search: { addBook: { data } } }} = getState();
    const book = data[viewing.index];

    //dispatch an optimistic update
    dispatch(postBookRequest(book));

    return makeBookRequest('post', {data: book})
      .then((res) => {
        if(res.status === 200) {
          dispatch(postBookSuccess(book));
        }
      })
      .catch((err) => {
        dispatch(postBookFailure({
          message: 'Unfortunately, we could not add your book. Please check your submission and try again.',
          book: book
        }))
      });
  };
};

export function deleteBook(book) {
  return (dispatch, getState) => {
    if(typeof book.altId === 'string') {
      const { user: { books } } = getState();
      const i = books.indexOf(book);

      dispatch(deleteBookRequest({data: book, index: i}));

      return makeBookRequest('delete', {data: book})
        .then((res) => {
          if(res.status === 200) {
            dispatch(deleteBookSuccess(book));
          }
        })
        .catch((err) => {
          dispatch(deleteBookFailure({
            message: 'Unfortunately, we could not delete your book. Please try again at a later time.',
            book: book
          }))
        });
    }

  };
};

export function changeViewToSingle(data) {
  return (dispatch, getState) => {
    const changeState = new Promise((resolve, reject) => {
      dispatch(viewSingleBook([data]))
      resolve();
    });

    changeState.then(() => {
      browserHistory.push('/viewBook');
    })
    .catch((err) => {
      console.log('Something went wrong with your request');
    })

  };
};

//HELPER ACTION CREATORS

export function clearResults() {
  return {
    type: types.CLEAR_RESULTS
  };
};