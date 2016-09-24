import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserBook, proposeTrade } from 'actions/trades';
import classNames from 'classnames/bind';
import styles from 'css/pages/proposeTrade';
import Instructions from 'components/Instructions/Instructions';

const cx = classNames.bind(styles);

class ProposeTrade extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  render() {
    const { user, selectUserBook, proposeTrade } = this.props;
    return (
      <div className={cx('content')}>
        { typeof user.trades.potential !== 'undefined' && typeof user.trades.potential.requestedBook !== 'undefined' ?
          <Instructions 
            user = {user}
            selectBook = { selectUserBook }
            proposeTrade = { proposeTrade }
          /> :
          null
        }
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

export default connect(mapStateToProps, { selectUserBook, proposeTrade })(ProposeTrade);