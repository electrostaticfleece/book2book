import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { deleteBook } from 'actions/books';
import { selectRequestedBook } from 'actions/trades';
import classNames from 'classnames/bind';
import styles from 'css/pages/viewBook';
import SingleBook from 'components/SingleBook/SingleBook';

const cx = classNames.bind(styles);

class ViewBook extends Component {
  constructor(props) {
    super(props);
    this.tradeOrDelete = this.tradeOrDelete.bind(this);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  deleteBook(book) {
    const { deleteBook } = this.props;

    deleteBook(book);
    browserHistory.push('/mybooks');
  }

  proposeTrade(book) {
    const { selectRequestedBook } = this.props;

    selectRequestedBook(book);
    browserHistory.push('/proposetrade');
  }

  tradeOrDelete() {
    const { books: { search: { viewBook: { data } } }, user: { books } } = this.props;
    if(books.length > 0) {
      const del = books.some((book) => book.altId === data[0].altId);
      return (
        <div 
          className={cx({circle: true, fill: !del, extendCircle: !del})} 
          onClick = { () => del ? this.deleteBook(data[0]) : this.proposeTrade(data[0]) }>
          <i
            className={cx({
              delete: del,
              trade: !del,
              'icon-mid': del,
              'icon-sm': !del
            })}
            title = { del ? 'Delete' : 'Trade '}
          >
          </i>
        </div>
      );
    } else {
      return (
        <div className={cx('text-container')}>
          <p className={cx('text')}>
            If you don't add any books you can't make a trade!
            How can you make a trade if you don't add any books?
          </p>
          <Link to='/addbook'><p className={cx('link')}>Add Some Books</p></Link>
        </div>
      );
    }
  }

  render() {
    const { books, user: {authenticated} } = this.props;
    return (
      <SingleBook 
        books = {books} 
        icons = { authenticated  ? this.tradeOrDelete : null }
      />
    );
  }
}

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
}

export default connect(mapStateToProps, { deleteBook, selectRequestedBook })(ViewBook);