import * as types from 'types';

const replaceData = function(data, replace) {
  const newObj = {...data};
  Object.keys(replace).forEach((key) => {
    newObj[replace[key][0]] = replace[key][1];
    delete newObj[key];
  });
  return newObj;
};

const resBookData = {
  title: '1984',
  authors: ['George Orwell'],
  categories: ['Fiction'],
  description: 'The year 1984 has come and gone, but George Orwell\'s prophetic, nightmarish vision in 1949 of the world we were becoming is timelier than ever.', 
  imageLinks: { 
    thumbnail: 'http://books.google.com/books/content?id=bC8wDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  industryIdentifiers:  [{identifier: '0547504187'}],
  altId: 'avke340df32c'
};

const bookObj = replaceData(resBookData, {
  industryIdentifiers: [ 'isbn', resBookData.industryIdentifiers[0].identifier],
  imageLinks: ['image', resBookData.imageLinks.thumbnail]
});

const reqData = {
  inauthor: 'Orwell',
  intitle: '1984'
};

const resData = {
  items: [{
    volumeInfo : resBookData,
    id: resBookData.altId
  }],
  totalItems: 3
};

const reducerData = {
  defaultData: {
    search: {
      addBook: {},
      findBook: {}
    },
    viewing: {
      id: null,
      index: null,
      page: null
    }
  },
  addBookLoaded: {
    search: {
      addBook: {
        data: [bookObj, {...bookObj, altId: 'kfmnwefn3o'}],
        status: 'success',
        totalItems: 3
      },
      findBook: {}
    },
    viewing: {
      id: bookObj.altId,
      index: 1,
      page: 'addBook',
      lastOfSet: 1
    }
  }
};

const testActions = {
  getBookRequest : {
    type: types.GET_BOOK_REQUEST,
    payload: reqData
  },
  getNewBookSuccess: {
    type: types.GET_NEW_BOOK_SUCCESS, 
    payload: {
      data: [bookObj],
      totalItems: 3,
      index: 0,
      lastOfSet: 1
    }
  },
  getBookSuccess: {
    type: types.GET_BOOK_SUCCESS, 
    payload: {
      data: [bookObj],
      totalItems: 3,
      index: 2,
      lastOfSet: 3
    }
  },
  getBookFailure : {
    type: types.GET_BOOK_FAILURE,
    payload: {
      message: 'Unfortunately, your query failed. Please check your query and try again',
      query: reqData
    }
  },
  getNextBook: {
    type: types.GET_NEXT_BOOK,
    payload: {
      index: 1,
      id: 'dafsdvred'
    }
  }, 
  postBookRequest: {
    type: types.POST_BOOK_REQUEST,
    payload: bookObj
  },
  postBookSuccess: {
    type: types.POST_BOOK_SUCCESS,
    payload: bookObj
  },
  postBookFailure: {
    type: types.POST_BOOK_FAILURE,
    payload: {
      message: 'Unfortunately, we could not add your book. Please check your submission and try again.',
      book: bookObj
    }
  },
  clearResults: {
    type: types.CLEAR_RESULTS
  }
};

export default {
  resData,
  bookObj,
  reqData,
  testActions,
  reducerData
};