import { polyfill } from 'es6-promise';

polyfill();

function underscoreLeft(string) {
  return '_' + string;
}

function createTypeName(statusName) {
  return statusName.replace(/[A-Z]/g, underscoreLeft).toUpperCase();
}

//Creates a function that will handle a request based on whether a status is equal to http status code. 

export function createHandleRes(code, actionCreator) {
  return function(res) {
    if(res.status === code) {
      return actionCreator(res);
    }
  };
}

/*
 * Standardizes and simplifies requests by dispatching three actions that correspond
 * to the request lifecycle (optimistic, success, and failure). If additional dispatches 
 * are needed, simply wrap them in the function corresponding to the dispatch and return 
 * the final action creator that needs to be fired for that lifecycle function. 
 *
 * @dispatch: The dispatch from your thunk 
 * @optimistic: An optimistic action creator or function that returns an action creator 
 * to be fired before the request
 * @config: Configuration for your request. It must include a type. Options and 
 * and an api string are optional
 * @handleRes: An action creator or function that returns an action creator to be fired after
 * a response is recieved
 * @failire: An action creator of function that returns an action creator to be fired after
 * a response fails
 */

export function createRequestHandler(requestFunc) {
  return function handler(dispatch, optimistic, config, handleRes, failure){
    dispatch(optimistic());

    if(handleRes && failure && config.type) {
      return requestFunc(config.type, config.options, config.api)
        .then((res) => {
          const successAction = handleRes(res);
          if(successAction){
            return dispatch(successAction);
          }
        })
        .catch((err) => {
          dispatch(failure(err));
        });
    }
  };
}

function createActionCreator(status, name, writeTo, types, namingFunc) {
  const statusName = name + status;
  const typeName = namingFunc(statusName);
  writeTo[statusName] = function(data) {
    return {
      type: types[typeName],
      payload: data
    };
  };
}

/*
 * Takes a pairing of actionNames and statuses and writes an action to the actions object for each 
 * status/action combination 
 *
 * @pairs : An object with two properties (both arrays) named actionNames & statuses
 * @actions: An object to write actions to. Defaults to an empty object
 */

export function createActionCreators(pairs, actions = {}, types) {
  pairs.forEach((pair) => {
    const {actionNames, statuses} = pair;

    actionNames.forEach((name) => {

      statuses.forEach((status) => {
        createActionCreator(status, name, actions, types, createTypeName);
      });
    });
  });
  return actions;
}