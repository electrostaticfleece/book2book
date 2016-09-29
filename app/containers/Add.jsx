import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { getBook, changeBook, postBook, resetView } from 'actions/books';
import { typing, clearTyping } from 'actions/input';
import styles from 'css/pages/addBook';
import SearchForm from 'components/Search/SearchForm';
import SingleBook from 'components/SingleBook/SingleBook';

const cx = classNames.bind(styles);

class Add extends Component {
  constructor(props) {
    super(props);
    this.mapIcons = this.mapIcons.bind(this);
  }

  componentDidMount() {
    const {clearTyping, resetView} = this.props;
    //Clear any typing from a previous search
    clearTyping();
    resetView();
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);

  }

  mapIcons(condition) {
    /* 
     * A condition is passed through to the mapIcons function for our onClick 
     * event because we need the current state of the application. Otherwise, 
     * react will use the curerent state where the function was defined. 
     *
     * Injecting icons into the component allows for greater control over their properties. 
     */
    const { changeBook, postBook } = this.props;
    const icons = [ {
      func: () => { return condition(changeBook, -1); },
      classes: {left: true, 'icon-mid': true},
      title: 'Previous Book'
    }, {
      func: () => postBook(),
      classes: {plus: true, 'icon-mid': true},
      title: 'Add book to my collection'
    }, {
      func: () => { return condition(changeBook, 1); },
      classes: {right: true, 'icon-mid': true},
      title: 'Next Book'
    }];

    return icons.map((icon, i) => {
      return (
        <div 
          className={cx('circle')} 
          key = {icon.title}>
          <i
            onClick = { icon.func }
            className = {cx(icon.classes)}
            title = { icon.title }
            key = {i}
          >
          </i>
        </div>
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
    );
  }
}

function mapStateToProps({user, input, books}) {
  return {
    user,
    input,
    books
  };
}

export default connect(mapStateToProps, {getBook, typing, changeBook, postBook, clearTyping, resetView})(Add);