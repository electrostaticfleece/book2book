import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getBook, clearResults, postBook } from 'actions/books';
import { typing, clearTyping } from 'actions/input';
import styles from 'css/components/addBook';
import SearchForm from 'components/SearchForm';
import SingleBook from 'containers/SingleBook'

const cx = classNames.bind(styles);

class Add extends Component {
  constructor(props) {
    super(props);
    this.findBook = this.findBook.bind(this);
    this.typing = this.typing.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  findBook(e) {
    const { getBook, clearResults } = this.props;
    getBook(0, true);
  }

  addBook(e) {
    const { postBook } = this.props;
    e.preventDefault();
    postBook();
  }

  typing(e) {
    const { typing } = this.props;
    e.preventDefault();

    typing({
      value: e.target.value, 
      source: e.target.id
    });

  }

  render() {
    const { input, books: { viewing } } = this.props;
    return (
      <div>
        <SingleBook />
        <SearchForm handleSubmit = { this.addBook } typing = { this.typing } input={input} findBook = { this.findBook } />
      </div>
    )
  }
}

function mapStateToProps({user, input, books}) {
  return {
    user,
    input,
    books
  };
}

export default connect(mapStateToProps, {getBook, typing, clearResults, postBook})(Add);