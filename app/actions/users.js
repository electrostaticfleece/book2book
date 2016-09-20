import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from 'types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}

// Log Out Action Creators
export function beginLogout() {
  return { type: types.LOGOUT_USER};
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

export function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());
    /*
    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
    */
  };
}