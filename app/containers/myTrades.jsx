import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStatus } from 'actions/trades';
import { getUserChanges } from 'actions/users';
import classNames from 'classnames/bind';
import styles from 'css/pages/trades';
import Trades from 'components/Trades';

const cx = classNames.bind(styles);

class MyTrades extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  static need = [ getUserChanges ]

  render() {
    const { user, changeStatus } = this.props;
    return (
      <div className={cx('body')}>
        <Trades 
          user = { user }
          changeStatus = { changeStatus }
        />
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, {changeStatus})(MyTrades);