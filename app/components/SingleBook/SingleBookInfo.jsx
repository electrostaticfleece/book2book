import React, { Component, PropTypes } from 'react';
import dynamics from 'dynamics.js';
import Card from 'components/Cards/Card';
import classNames from 'classnames/bind';
import styles from 'css/components/singleBookInfo';

const cx = classNames.bind(styles);

class SingleBookInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { book: { title, authors, description } } = this.props;
    return (
      <div className={cx('bookInfo')}>
        <Card cardStyles={{card: {card: true, stars: true, title: true, mid: true},}}>
          <h2>{ title }</h2>
        </Card>
        <Card cardStyles={{card: {card:true, content: true}}}>
            <h3>{ authors ? authors.join(', ') : null}</h3>
            <p>{description}</p>
        </Card>
      </div>
    );
  }
};

export default SingleBookInfo;