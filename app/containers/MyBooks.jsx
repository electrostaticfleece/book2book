import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/myBooks';
import { changeViewToSingle, deleteBook } from 'actions/books';
import MultiBook from 'components/MultiBook';

const cx = classNames.bind(styles);

class MyBooks extends Component {
  constructor(props) {
    super(props);
    this.deleteButton = this.deleteButton.bind(this);
    this.viewButton = this.viewButton.bind(this);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  deleteButton() {
    const { deleteBook } = this.props;
    return {
      func: (book) => deleteBook(book) ,
      classes: {delete: true, icon: true}
    };
  }

  viewButton() {
    const { changeViewToSingle } = this.props;
    return {
      func: (book) => changeViewToSingle(book),
      classes: {view: true, icon: true}
    };
  }

  render() {
    const { user: { books } } = this.props;
    const dimensions = {width: 200, margin: 20};
    return (
      <div className={cx('myBooks')}>
        { books.length > 0 ? 
        <MultiBook 
          books = {books}
          icons = {[this.deleteButton(), this.viewButton()]}
          bookSize = 'small'
          dimensions = {dimensions}
          percentOfPage = {0.85}
        />
        : null }
      </div>
    );
  }
}

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
}

export default connect(mapStateToProps, {changeViewToSingle, deleteBook})(MyBooks);