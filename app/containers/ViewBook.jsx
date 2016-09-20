import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import SingleBook from 'components/SingleBook';

class ViewBook extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { books } = this.props;
    return (
      <SingleBook books = {books} />
    );
  }
};

function mapStateToProps({books, user}) {
  return {
    user,
    books
  };
};

export default connect(mapStateToProps, {})(ViewBook);