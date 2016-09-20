import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/home';

const cx = classNames.bind(styles);

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { books } = this.props;
    return (
      <div className={cx('home')}>
        <div className={cx('hero')}>
          <div className={cx('filter')} >
          </div>
          <div className={cx('heading')}>
            <h1>Explore New Worlds!</h1>
            <p>Your next literary adventure begins here.</p>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
};

export default connect(mapStateToProps, {})(Home);