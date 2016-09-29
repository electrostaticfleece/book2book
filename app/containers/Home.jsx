import React, { Component } from 'react';
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
    this.getMoreBooks = this.getMoreBooks.bind(this);
    this.getDocHeight = this.getDocHeight.bind(this);
    this.state = {
      showBooks: 14,
      addToLength: 14,
      reqLength: 50
    };
  }

  componentDidMount() {
    const { getAvailableBooks } = this.props;
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
    getAvailableBooks(50, 0);
    window.addEventListener('scroll', this.getMoreBooks);
  }

  getMoreBooks(){
    const { books: {search: {findBook: { data } } }, getAvailableBooks } = this.props;
    const books = data || [];
    const { showBooks, addToLength, reqLength } = this.state;
    const height = window.innerHeigh || document.documentElement.clientHeight|| document.body.clientHeight;
    const scrollTop = window.scrollTop || window.pageYOffset;

    if(height + scrollTop === this.getDocHeight()){
      const nextLength = showBooks + addToLength;

      if(books.length < nextLength && books.length === reqLength ){
        getAvailableBooks(books.legnth + reqLength);
      }
      if(books.length > showBooks - addToLength){
        this.setState({showBooks: nextLength});
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll' , this.getMoreBooks);
  }

  getDocHeight() {
    const D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  viewButton() {
    return {
      func: () => {},
      classes: {view: true, icon: true}
    };
  }

  render() {
    const { books: {search: {findBook: { data } } }, changeViewToSingle } = this.props;
    const books = data || [];
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <div className={cx('filter')} >
          </div>
          <div className={cx('heading')}>
            <h1>Explore New Worlds!</h1>
            <p>Your next literary adventure is a trade away.</p>
          </div>
        </div>
        <div className={cx('bookView')}>
          <MultiBook
            books = {books.filter((book, i) => { return i < this.state.showBooks; })}
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
}

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
}

export default connect(mapStateToProps, {getAvailableBooks, changeViewToSingle})(Home);