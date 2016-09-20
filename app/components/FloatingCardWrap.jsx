import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import FloatingCard from 'components/FloatingCard';
import dynamics from 'dynamics.js';
import galaxy from 'images/galaxy.gif';

class FloatingCardWrap extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { image } = this.props;
    return (
      <FloatingCard 
        image={image || galaxy} 
        dynamics={dynamics}
      />
    );
  }
};

export default FloatingCardWrap;