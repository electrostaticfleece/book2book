import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getBook, changeBook, postBook } from 'actions/books';
import { typing, clearTyping } from 'actions/input';
import styles from 'css/components/addBook';
import SearchForm from 'components/Search/SearchForm';
import SingleBook from 'components/SingleBook/SingleBook'

const cx = classNames.bind(styles);

class Add extends Component {
  constructor(props) {
    super(props);
    this.mapIcons = this.mapIcons.bind(this);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  mapIcons(condition) {
    /* 
     * A condition is passed through to the mapIcons function for our onClick 
     * event because we need the currentstate of the application. Otherwise, 
     * react does not recognize that the status of our search request has changed. 
     *
     * By injecting icons into the component allowing for greater control over properties. 
     */
    const { changeBook, postBook } = this.props;
    const icons = [ {
      func: (e) => { return condition(changeBook, -1); },
      classes: {left: true, 'icon-mid': true},
      title: 'Previous Book'
    }, {
      func: (e) => postBook(),
      classes: {plus: true, 'icon-mid': true},
      title: 'Add book to my collection'
    }, {
      func: (e) => { return condition(changeBook, 1); },
      classes: {right: true, 'icon-mid': true},
      title: 'Next Book'
    }];

    return icons.map((icon, i) => {
      return (
        <i
          onClick = { icon.func }
          className = {cx(icon.classes)}
          title = { icon.title }
          key = {i}
        >
        </i>
      );
    });
  }

  render() {
    const { input, getBook, typing, books } = this.props;
    return (
      <div className={cx('addModule')} >
        <SearchForm 
          getBook = { getBook }
          value={input.addBookQuery}
          typing = { typing }
          status = { books.search.addBook.status }
        />
        <SingleBook 
          icons = { this.mapIcons }
          books = { books }
        />
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

export default connect(mapStateToProps, {getBook, typing, changeBook, postBook})(Add);