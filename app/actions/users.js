import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from 'types';
import { createHandleRes, createRequestHandler } from 'actions/auxiliary';
import { browserHistory } from 'react-router';


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

export function userChanges(data) {
  return {
    type: types.USER_CHANGES,
    payload: data
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
    
    return handleRequests(dispatch, optimistic, config, success, failure);
  };
}

export function getUserChanges() {
  console.log('User changes firing');
  return (dispatch, getState) => {
    const { client: { noLoad } } = getState();
    if(!noLoad){
      return makeUserRequest('get')
      .then((res) => {
        if(res.status === 200) {
          return dispatch(userChanges(res.data));
        }
      });
    }
  };
}