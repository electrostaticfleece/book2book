import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { changeBook } from 'actions/books';
import SearchInput from 'components/SearchInput';

class SingleBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { books: { viewing, search }, changeBook } = this.props;
      const thisBook = viewing.page && viewing.index !== null && search[viewing.page].data ? search[viewing.page].data[viewing.index] : null;
    return (
      <div>
        { thisBook  ? 
          <span>
            <h2>{thisBook.title}</h2>
            <h3>{ thisBook.authors ? thisBook.authors.join(', ') : null}</h3>
            <p>{thisBook.description}</p>
            <img src={thisBook.image} />
            <button onClick = { (e) => changeBook(-1)} >prev</button>
            <button onClick = { (e) => changeBook(1)} >next</button>
          </span>
        : null
        }
      </div>
    )
  }
}

function mapStateToProps({books}) {
  return {
    books
  };
}

export default connect(mapStateToProps, {changeBook})(SingleBook);