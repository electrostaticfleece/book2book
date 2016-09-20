import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/floatingCard';

const cx = classNames.bind(styles);

class FloatingCard extends Component {
  constructor(props) {
    super(props);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      card: null,
      maxRotation: {
        x: 6,
        y: 6
      },
      light: {
        ref: null,
        defaultWidth: 40,
        defaultAngle: 50,
        maxWidth: 20,
        maxAngle: 20,
        value : {
          width: 40,
          angle: 50
        }
      }
    };
  }

  componentDidMount() {
    const { light } = this.state;
    this.setState({
      card: this.refs.floatingCard, 
      light: {
        ...light,
        ref: this.refs.cardLight
      }
    });
  }

  mouseLeave(e) {
    const { dynamics } = this.props;
    const { light } = this.state;
    const { cardWrap } = this.refs;
    dynamics.animate(cardWrap, {
      rotateX: 0,
      rotateY: 0
    }, {
      type: dynamics.spring,
      duration: 1500
    });

    dynamics.animate(light.value, {
      width: light.defaultWidth,
      angle: light.defaultAngle
    }, {
      type: dynamics.spring,
      duration: 1500,
      change: (obj) => {
        if(this.refs.cardLight) {
          this.refs.cardLight.style.backgroundImage = "linear-gradient(" + obj.angle + "deg, rgba(0, 0, 0, 0.35), transparent " + obj.width + "%)";
        }
      }
    })
  }

  getDimensions(card) {
    return {
      rect: card.getBoundingClientRect(),
      halfWidth: card.offsetWidth / 2,
      halfHeight: card.offsetHeight / 2,
    }
  }

  getOffset(rect) {
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    }
  }

  getMousePosition(e, offset) {
    return {
      x: e.pageX - offset.left,
      y: e.pageY - offset.top
    }
  }

  getDifference(mouse, dimensions) {
    return {
      x: -1 * (dimensions.halfWidth - mouse.x),
      y: dimensions.halfHeight - mouse.y
    }
  }

  getRotation(maxRotation, dimensions, diff) {
    return {
      x: diff.y / dimensions.halfHeight * maxRotation.x,
      y: diff.x / dimensions.halfWidth * maxRotation.y
    }
  }

  mouseMove(e) {
    const { cardWrap, cardLight } = this.refs;
    const { card, maxRotation, light } = this.state;
    const { dynamics } = this.props;

    //Get the position, mouse position, & dimensions of the card
    const dimensions = this.getDimensions(card);
    const offset = this.getOffset(dimensions.rect);
    const mouse = this.getMousePosition(e, offset);

    //Move the card
    const diff = this.getDifference(mouse, dimensions);
    const rotate = this.getRotation(maxRotation, dimensions, diff);
    dynamics.stop(cardWrap);
    cardWrap.style.transform = "rotateX(" + rotate.x + "deg) rotateY(" + rotate.y + "deg)";

    //Move the light
    this.setState({
      light: {
        ...light,
        value: {
          width: light.defaultWidth - (diff.y / dimensions.halfHeight * light.maxWidth),
          angle: light.defaultAngle - (diff.x / dimensions.halfWidth * light.maxAngle)
        }
      }
    });

    dynamics.stop(light.value);
    cardLight.style.backgroundImage = "linear-gradient(" + light.value.angle + "deg, rgba(0, 0, 0, 0.35), transparent " + light.value.width + "%)";
  }

  render() {
    const { image } = this.props;
    return (
      <article 
        className={cx('floatingCard')} 
        ref={'floatingCard'} 
      >
        <div 
          className={cx('cardWrap')} 
          ref={'cardWrap'} 
          onMouseLeave={ this.mouseLeave } 
          onMouseMove={ this.mouseMove }
        >
          <img 
            src={image} 
            className={cx('floatingCardThumb')} 
          />
          <span 
            className={cx('cardLight')} 
            ref={'cardLight'} 
          >
          </span>
        </div>
      </article>
    )
  }
}

export default FloatingCard;