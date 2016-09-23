import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/card';

const cx = classNames.bind(styles);

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cardStyles, styles } = this.props;
    const style = styles ? styles: null;
    return (
      <div className={cx(cardStyles.card)} style={style} >
        { cardStyles.background ? <div className={cx(cardStyles.background)}></div> : null}
        {this.props.children}
     </div>
    );
  }
}

export default Card;