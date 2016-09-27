import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/trades';

const cx = classNames.bind(styles);

class Trades extends Component {
  constructor(props) {
    super(props);
    this.makeDecision = this.makeDecision.bind(this);
  }

  makeDecision(e, trade) {
    const { changeStatus } = this.props;
    const status = (e.target.value || e.target.text).toLowerCase();
    if(status && status !== '--'){
      changeStatus(trade, (status === 'cancel' ? 'canceled' : status));
    }
  }

  cancelTrade(trade){
    return (
      <a href='#' onClick = {(e) => this.makeDecision(e, trade)}>Cancel</a>
    );
  }

  acceptOrDecline(trade){
    return (
      <select onChange = { (e) => this.makeDecision(e, trade) }>
        <option defaultValue> -- </option>
        <option value='accepted' >Accept</option>
        <option value='declined'>Decline</option>
      </select>
    );
  }

  sliceDate(date) {
    return date.slice(0, date.indexOf('T'));
  }

  checkStatus(status) {
    return status === 'canceled' || status === 'declined' || status === 'accepted';
  }

  mapDataToRows(trades, user) {
    const userId = user.userId;
    return trades.map((trade) => {
      const { Books } = trade;
      const userRequested = userId === trade.requestedby;
      const requestedBook = Books.find((book) => book.altId === trade.requestedbook);
      const decisionBook = Books.indexOf(requestedBook) ? Books[0] : Books[1];
      return (
        <tr key={trade.tradeID || 'temp'}>
          <td>{this.sliceDate(trade.createdAt)}</td>
          <td> { userRequested ? decisionBook.title : requestedBook.title }</td>
          <td> { userRequested ? requestedBook.title: decisionBook.title }</td>
          <td className={cx({
            accepted: trade.status === 'accepted',
            declined: trade.status === 'declined'
          })}> 
            { trade.status.toUpperCase() } 
          </td>
          <td> 
            { this.checkStatus(trade.status) ? null : (userRequested ? this.cancelTrade(trade) : this.acceptOrDecline(trade)) }
          </td>
        </tr>
      );
    });
  }

  mapHeaders(headers = ['Date Requested', 'My Book', 'Their Book', 'Status', 'Action']) {
    return headers.map((header) => {
      return (
        <th key={header}>{header}</th>
      );
    });
  }

  render() {
    const { user: { trades: { existing } }, user } = this.props;

    return (
      <div className={cx('trades')}>
        <table>
          <thead>
            <tr>
               {this.mapHeaders()}
            </tr>
          </thead>
          <tbody>
            { existing ? this.mapDataToRows(existing, user) : null }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Trades;