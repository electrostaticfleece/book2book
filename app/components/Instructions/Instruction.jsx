import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/instruction';

const cx = classNames.bind(styles);

class Instruction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { num, header } = this.props;
    return (
      <div className={cx('instruction')}>
        <div className={cx('number')}><div>{ num }</div></div>
        <h2 className={cx('header')}> { header } </h2>
      </div>
    );
  }
}

export default Instruction;