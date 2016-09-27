import * as types from 'types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { polyfill } from 'es6-promise';
import { createHandleRes, createRequestHandler, createActionCreators } from 'actions/auxiliary';

polyfill();

const singleStatus = [
  'selectRequestedBook',
  'selectUserBook',
  'updateStatus',
  'decisionFailedToWrite'
];

const singleNames = [''];

const requestStatuses = [
  'Request', 
  'Success', 
  'Failure'
];

const requestNames = [
  'proposeTrade',
  'getAllTrades'
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
  updateStatus,
  decisionFailedToWrite,
  proposeTradeRequest,
  proposeTradeSuccess,
  proposeTradeFailure,
  getAllTradesRequest,
  getAllTradesSuccess,
  getAllTradesFailure
} = createActionCreators(pairs, {}, types);

export function proposeTrade() {
  return (dispatch, getState) => {
    const { user: { trades: { potential }, userId } } = getState();
    const config = {type: 'post', options: {data: potential}};
    const success = createHandleRes(200, (res) => {
      const { data: { trade: { meta, requestedBook, userBook }}} = res;
      return proposeTradeSuccess({
        ...meta, 
        Books: [
          requestedBook, 
          userBook
        ]
      }); 
    });
    const optimistic = () => { 
      browserHistory.push('myTrades'); 

      return proposeTradeRequest({
        requestedbook: potential.requestedBook.altId,
        decisionbook: potential.userBook.altId,
        Books: [potential.requestedBook, potential.userBook],
        requestedby: userId,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }); 
    };

    handleRequests(dispatch, optimistic, config, success, proposeTradeFailure);
  };
}

export function changeStatus(trade, status) {
  return (dispatch) => {
    const allowedStatus = ['accepted', 'declined', 'canceled', 'pending'];

    if(typeof status === 'string' && allowedStatus.some((allowed) => allowed === status)){
      const { tradeID } = trade;
      const optimistic = () => { return updateStatus({status, tradeID}); };
      const config = {type: 'put', options: {data: {status, tradeID, trade}}};
      const success = createHandleRes(200, (res) => { return getAllTradesSuccess(res.data.trades) });
      const failure = () => { return updateStatus({status: 'pending', tradeID}); };

      handleRequests(dispatch, optimistic, config, success, failure);
    }
  };
}
