import React, { Component } from 'react';
import FloatingCard from 'components/Cards/FloatingCard';
import dynamics from 'dynamics.js';
import galaxy from 'images/galaxy.gif';

// A wrapper component is required because dynamics does not load properly otherwise

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
}

export default FloatingCardWrap;