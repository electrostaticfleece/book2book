import configureStore from 'redux-mock-store';
import expect from 'expect';
import * as types from 'types';
import * as actions from 'actions/client';

const mockStore = configureStore();

describe('Client Actions', () => {
  it('dispatches a multibook width change action', done => {
    const expectedActions = [{
      type: types.MULTIBOOK_WIDTH_CHANGE,
      payload: 200
    }];

    const store = mockStore({});
    store.dispatch(actions.changeMultiBookWidth(200));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('dispatches a mountmultibook action', done => {
    const expectedActions = [{
      type: types.MOUNT_MULTIBOOK,
      payload: true
    }];

    const store = mockStore({});
    store.dispatch(actions.mountMultiBook(true));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});