import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { changeBook } from 'actions/books';
import SearchInput from 'components/SearchInput';
import FloatingCard from 'components/FloatingCard';
import styles from 'css/components/singleBook';
import Card from 'components/Card';
import dynamics from 'dynamics.js';
import clouds from 'images/clouds.gif';

const cx = classNames.bind(styles)

class SingleBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { books: { viewing, search }, changeBook } = this.props;
    const thisBook = viewing.page && viewing.index !== null && search[viewing.page].data ? search[viewing.page].data[viewing.index] : null;
    const bookStyle = {card: true, bookImg: true};
    const bookBackground = {cardBackground: true, onyx: true};
    return (
      <div>
        { thisBook  ? 
          <span className={cx('layout')}>
            <div className={cx('controller')} >
              <Card cardStyles={{card: bookStyle, background: bookBackground}}> 
                <FloatingCard image={thisBook.image || clouds} dynamics={dynamics}/>
              </Card> 
              <Card cardStyles={{card: {card: true}}} >
                <button onClick = { (e) => changeBook(-1)} >prev</button>
                <button onClick = { (e) => changeBook(1)} >next</button>
              </Card>
            </div>
            <div className={cx('bookInfo')}>
              <Card cardStyles={{card: {card: true, ocean: true, title: true},}}>
                <h2>{thisBook.title}</h2>
              </Card>
              <Card cardStyles={{card: {card:true, content: true}}}>
                  <h3>{ thisBook.authors ? thisBook.authors.join(', ') : null}</h3>
                  <p>{thisBook.description}</p>
              </Card>
            </div>
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