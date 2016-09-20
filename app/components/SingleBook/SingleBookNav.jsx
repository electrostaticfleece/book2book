import React, { Component, PropTypes } from 'react';
import dynamics from 'dynamics.js';
import Card from 'components/Cards/Card';
import FloatingCardWrap from 'components/Cards/FloatingCardWrap';
import classNames from 'classnames/bind';
import styles from 'css/components/singleBookNav';

const cx = classNames.bind(styles);

class SingleBookNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { icons, status, image } = this.props;
    const cardStyle = [{card: true, bookImg: true}, {cardBackground: true, onyx: true}];
    return (
      <div className={cx('navigation')} >
        <Card cardStyles={{card: cardStyle[0], background: cardStyle[1]}}> 
          <FloatingCardWrap image={image} />
        </Card> 
        {/*To allow icons to work conditionally we pass through a function that executes 
         a callback if the set of books/book has been successfully found */}
        { icons ? 
          <Card cardStyles={{card: {card: true, controller: true, stars: true}}} >
            {icons((fn, arg) => {if(status === 'Success'){ fn(arg); }})}
          </Card>
          : null
        }
      </div>
    );
  }
};

export default SingleBookNav;