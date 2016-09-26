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
  updateStatus,
  decisionFailedToWrite,
  proposeTradeRequest,
  proposeTradeSuccess,
  proposeTradeFailure
} = createActionCreators(pairs, {}, types);

export function proposeTrade() {
  return (dispatch, getState) => {
    const { user: { trades: { potential } } } = getState();
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
    const optimistic = () => { browserHistory.push('myTrades'); return proposeTradeRequest; };

    handleRequests(dispatch, optimistic, config, success, proposeTradeFailure);
  };
}

export function changeStatus(trade, status) {
  return (dispatch) => {
    const allowedStatus = ['accepted', 'declined', 'canceled', 'pending'];

    if(typeof status === 'string' && allowedStatus.some((allowed) => allowed === status)){
      const { tradeID } = trade;
      const optimistic = () => { return updateStatus({status, tradeID: trade.tradeID}); };
      const config = {type: 'put', options: {data: {status, tradeID}}};
      const success = createHandleRes(200, () => { return false });
      const failure = () => { return updateStatus({status: 'pending', tradeID: trade.tradeID}); };

      handleRequests(dispatch, optimistic, config, success, failure);
    }
  };
}
