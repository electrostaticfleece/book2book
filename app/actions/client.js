import * as types from 'types';

export function changeMultiBookWidth(data) {
  return {
    type: types.MULTIBOOK_WIDTH_CHANGE,
    payload: data
  };
}

export function mountMultiBook(data) {
  return {
    type: types.MOUNT_MULTIBOOK,
    paload: data
  };
}