import expect from 'expect';
import reducer from 'reducers/books';
import testData from 'tests/data/books';

describe('Books reducer', () => {

  const { 
    bookObj, 
    testActions, 
    reducerData: { defaultData, addBookLoaded }
  } = testData;

  const { search, viewing } = addBookLoaded;
  const { addBook: { data } } = search;
  const {  page } = viewing;

  const altId = 'd2r2d3212edew';
  const newBook = {...bookObj, altId: altId};

  it('should return the inital state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(defaultData);
  });

  it('should change the status of addBook when a get request is made', () => {
    expect(
      reducer(undefined, testActions.getBookRequest)
    ).toEqual({
      ...defaultData,
      search: {
        ...defaultData.search,
        addBook: {
          ...defaultData.search.addBook,
          status: 'Requested'
        }
      }
    });
  });

  it('should add books to the existing data and update the view data when a getBookSuccess action is fired', () => {
    expect(
      reducer(addBookLoaded, {
        ...testActions.getBookSuccess, 
        payload: {
          ...testActions.getBookSuccess.payload,
          data: [newBook]
        }
      })
    ).toEqual(
      { 
        search: {
          ...search,
          addBook: {
            data: [...data, newBook],
            status: 'Success',
            totalItems: testActions.getBookSuccess.payload.totalItems
          }
        },
        viewing: {
          id: newBook.altId,
          index: testActions.getBookSuccess.payload.index, 
          page: page,
          lastOfSet: testActions.getBookSuccess.payload.lastOfSet
        }
      }
    );
  });

  it('should write over the existing data and update the view data when a getNewBookSuccess action is fired', () => {
    expect(
      reducer(addBookLoaded, {
        ...testActions.getNewBookSuccess,
        payload: {
          ...testActions.getNewBookSuccess.payload,
          data: [newBook]
        }
      })
    ).toEqual(
      {
        search: {
          ...search,
          addBook: {
            data: [newBook],
            status: 'Success',
            totalItems: testActions.getNewBookSuccess.payload.totalItems
          }
        },
        viewing: {
          id: newBook.altId,
          index: testActions.getNewBookSuccess.payload.index,
          page: page,
          lastOfSet: testActions.getNewBookSuccess.payload.lastOfSet
        }
      }
    );
  });

  it('should only change the status of addBook when a getBookRequest action is fired', () => {
    expect(
      reducer(addBookLoaded, testActions.getBookRequest)
    ).toEqual({
      ...addBookLoaded,
      search: {
        ...addBookLoaded.search,
        addBook: {
          ...addBookLoaded.search.addBook,
          status: 'Requested'
        }
      }
    });
  });

  it('should only change the status of addBook when a getBookFailure action is fired', () => {
    expect(
      reducer(addBookLoaded, testActions.getBookFailure)
    ).toEqual({
      ...addBookLoaded,
      search: {
        ...addBookLoaded.search,
        addBook: {
          ...addBookLoaded.search.addBook,
          status: 'Failed'
        }
      }
    });
  });

  it('should update the data associated with the state of the view when the next book is requested', () => {
    expect(
      reducer(addBookLoaded, testActions.getNextBook)
    ).toEqual({
      ...addBookLoaded,
      viewing: {
        ...addBookLoaded.viewing,
        id: testActions.getNextBook.payload.id,
        index: testActions.getNextBook.payload.index
      }
    });
  });

  it('should clear all previous search results', () => {
    expect(
      reducer(addBookLoaded, testActions.clearResults)
    ).toEqual({
      ...addBookLoaded,
      search: {
        addBook: {},
        findBook: {}
      }
    });
  });

});