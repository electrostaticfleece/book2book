import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dynamics from 'dynamics.js';
import FloatingCardWrap from 'components/FloatingCardWrap';
import Card from 'components/Card';
import galaxy from 'images/galaxy.gif';
import classNames from 'classnames/bind';
import styles from 'css/components/singleBook';

const cx = classNames.bind(styles);

class SingleBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { books: { viewing: {page, index}, search }, icons } = this.props;
    const thisBook =  page && index !== null && search[page].data ? search[page].data[index] : null;
    const bookStyle = [{card: true, bookImg: true}, {cardBackground: true, onyx: true}];
    return (
      <div className={cx('singleBook')}>
        {/* The page will only render if all required data is available */}
        { thisBook  ? 
          <span className={cx('layout')}>
            <div className={cx('navigation')} >
              <Card cardStyles={{card: bookStyle[0], background: bookStyle[1]}}> 
                <FloatingCardWrap image={thisBook.image} />
              </Card> 
            {/*To allow icons to work conditionally we pass through a function that executes 
             a callback if the set of books/book has been successfully found */}
              { icons ? 
                <Card cardStyles={{card: {card: true, controller: true, stars: true}}} >
                  {icons((fn, arg) => {if(search[page].status === 'Success'){ fn(arg); }})}
                </Card>
                : null
              }
            </div>
            <div className={cx('bookInfo')}>
              <Card cardStyles={{card: {card: true, stars: true, title: true, mid: true},}}>
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
    );
  }
};

export default SingleBook;