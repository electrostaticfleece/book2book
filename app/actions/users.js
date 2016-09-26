import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from 'types';
import { createHandleRes, createRequestHandler } from 'actions/auxiliary';


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

function makeUserRequest(method, config, api = '/user') {
  return axios[method](api, config);
}

const handleRequests = createRequestHandler(makeUserRequest);

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
  };
}

export function updateInfo(data) {
  return {
    type: types.UPDATE_INFO,
    payload: data
  };
}

export function updateSettings(settings) {
  return (dispatch, getState) => {
    const { user: { userInfo } } = getState();
    const optimistic = () => updateInfo(settings);
    const config = {type: 'put', options: {data: settings}};
    const success = createHandleRes(200, () => false);
    const failure = () => updateInfo(userInfo);
    
    handleRequests(dispatch, optimistic, config, success, failure);
  };
}