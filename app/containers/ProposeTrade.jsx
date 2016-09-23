import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUserBook } from 'actions/trades';
import classNames from 'classnames/bind';
import styles from 'css/pages/proposeTrade';
import Instructions from 'components/Instructions/Instructions';
import { browserHistory } from 'react-router';


const cx = classNames.bind(styles);

class ProposeTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: 1
    };
  }

  componentWillMount() {
    const { user: { trades: { potential, potential: { requestedBook } } } } = this.props;
    //Check to see if requested book exists, otherwise send the user home
    if(!potential.requestedBook || Object.keys(requestedBook).length === 0 && requestedBook.constructor === Object){
      browserHistory.push('/')
    }
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  render() {
    const { user, selectUserBook } = this.props;
    return (
      <div className={cx('content')}>
        <Instructions 
          user = {user}
          selectBook = { selectUserBook }
        />
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

export default connect(mapStateToProps, { selectUserBook })(ProposeTrade);