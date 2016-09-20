import React, { Component, PropTypes } from 'react';
import dynamics from 'dynamics.js';
import SingleBookInfo from'components/SingleBook/SingleBookInfo';
import SingleBookNav from'components/SingleBook/SingleBookNav';
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
          <div className={cx('layout')}>
            <SingleBookNav 
              icons = { icons }
              status = { search[page].status }
              image = { thisBook.image }
            />
            <SingleBookInfo book = { thisBook }/>
          </div>
          : null
        }
      </div>
    );
  }
};

export default SingleBook;