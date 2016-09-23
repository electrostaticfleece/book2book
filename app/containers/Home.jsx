import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getAvailableBooks, changeViewToSingle } from 'actions/books';
import styles from 'css/pages/home';
import MultiBook from 'components/MultiBook';

const cx = classNames.bind(styles);

class Home extends Component {
  constructor(props) {
    super(props);
    this.viewButton = this.viewButton.bind(this);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  viewButton() {
    const { changeViewToSingle } = this.props;
    return {
      func: () => {},
      classes: {view: true, icon: true}
    };
  }

  static need = [ () => { return getAvailableBooks(14) } ]

  render() {
    const { books, changeViewToSingle } = this.props;
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <div className={cx('filter')} >
          </div>
          <div className={cx('heading')}>
            <h1>Explore New Worlds!</h1>
            <p>Your next literary adventure is one trade away.</p>
          </div>
        </div>
        <div className={cx('bookView')}>
          <MultiBook
            books = {books.search.findBook.data}
            icons ={[this.viewButton()]}
            bookSize = 'small'
            dimensions = {{width: 200, margin: 10}}
            percentOfPage = {1}
            highlight = {true}
            wrap = {{click: (book) => changeViewToSingle(book), style: {pointer: true}}}
          />
        </div>
      </div>
    );
  }
};

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
}

export default connect(mapStateToProps, {getAvailableBooks, changeViewToSingle})(Home);