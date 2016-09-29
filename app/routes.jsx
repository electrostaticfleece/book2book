import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MyBooks from 'containers/MyBooks';
import ViewBook from 'containers/ViewBook';
import ProposeTrade from 'containers/ProposeTrade';
import Home from 'containers/Home';
import App from 'containers/App';
import Add from 'containers/Add';
import Settings from 'containers/Settings';
import MyTrades from 'containers/myTrades';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {

  const multipleFunc = (...funcs) => {

    return (nextState, replace, callback) => {
      funcs.forEach((func, i, arr) => {
        const cb = (i === arr.length - 1) ? callback : () => {};
        func(nextState, replace, cb);
      });
    };
  };

  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const requireViewBook = (nextState, replace, callback) => {
    const { books: { viewing: { page }}} = store.getState();
    if(page !== 'viewBook' ) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const requirePotentialBook = (nextState, replace, callback) => {
    const { user: { trades: { potential } } } = store.getState();
    if(typeof potential === 'undefined' || 
      typeof potential.requestedBook === 'undefined' || 
      !potential.requestedBook.altId 
    ) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="addBook" component={Add} onEnter={requireAuth} />
      <Route path="myBooks" component={MyBooks} onEnter={requireAuth} />
      <Route path="viewBook" component={ViewBook} onEnter={requireViewBook}/>
      <Route path="proposeTrade" component={ProposeTrade} onEnter={multipleFunc(requireAuth, requirePotentialBook)} />
      <Route path="mytrades" component={MyTrades} onEnter={requireAuth} />
      <Route path="settings" component={Settings} onEnter={requireAuth} />
    </Route>
  );
};