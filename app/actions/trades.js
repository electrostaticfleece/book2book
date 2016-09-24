import * as types from 'types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { polyfill } from 'es6-promise';
import { createHandleRes, createRequestHandler, createActionCreators } from 'actions/auxiliary';

polyfill();

const singleStatus = [
  'selectRequestedBook',
  'selectUserBook',
  'getAllTradesSuccess',
  'acceptTradeRequest',
  'rejectTradeReqiest',
  'decisionFailedToWrite',
];

const singleNames = [''];

const requestStatuses = [
  'Request', 
  'Success', 
  'Failure'
];

const requestNames = [
  'proposeTrade'
];

const pairs = [{
  actionNames: requestNames, 
  statuses: requestStatuses
} , {
  actionNames: singleNames,
  statuses: singleStatus
}];


function makeTradeRequest(method, config, api = '/trades') {
  return axios[method](api, config);
}

const handleRequests = createRequestHandler(makeTradeRequest);

export const {
  selectRequestedBook,
  selectUserBook,
  getAllTradesSuccess,
  acceptTradeRequest,
  rejectTradeRequest,
  decisionFailedToWrite,
  proposeTradeRequest,
  proposeTradeSuccess,
  proposeTradeFailure
} = createActionCreators(pairs, {}, types);

export function proposeTrade() {
  return (dispatch, getState) => {
    const { user: { trades: { potential } } } = getState();
    const config = {type: 'post', options: {data: potential}};
    const success = createHandleRes(200, (res) => { return proposeTradeSuccess(res.data.trade); });

    handleRequests(dispatch, proposeTradeRequest, config, success, proposeTradeFailure);
  };
}
