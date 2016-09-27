import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/multiBook';
import galaxy from 'images/galaxy.gif';

const cx = classNames.bind(styles);

class Book extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.hanldeMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      selected: null
    };
  }

  handleMouseEnter(id) {
    const { highlight } = this.props;
    if(highlight) {
      this.setState({selected: id});
    }
  }

  handleMouseLeave() {
    const { highlight } = this.props;
    if(highlight) {
      this.setState({selected: null});
    }
  }

  mapIconsToBook(icons = [], book) {
    return icons.map((icon, i, arr) => {
      const iconClass = arr.length < 2 ? 'single' : 'double' + (i+1);
      return (
        <i 
          key={i} 
          onClick={() => icon.func(book) } 
          className={cx({...icon.classes, [iconClass]: true})}> 
        </i>
      );
    });
  }

  render() {
    const { highlight, book, bookSize, icons, dimensions, hover } = this.props;
    const { width, margin } = dimensions;
    const filter = {
      filterLayer: true,
      bookFilter: !highlight, 
      highlight: this.state.selected === book.altId, 
      fade: this.state.selected && this.state.selected !== book.altId
    };
    if(hover && hover.style) {
      Object.keys(hover.style).forEach((key) => filter[key] = hover.style[key]);
    }
    return (
      <div 
        key={book.altId} 
        className={cx('book')} 
        style={{'marginLeft': margin, 'marginRight': margin, width: width}}
        title={book.title}
      >
        <div className={cx({bookWrap: true})}>
          <img 
            src={book.image ? (bookSize === 'small' ? book.image.replace('zoom=2', 'zoom=1') : book.image) : galaxy} 
            className = {cx('bookImg')}
          />
          <div 
            className={cx(filter)}
            onClick ={ hover ? () => hover.click(book) : null }
            onMouseEnter = { () => this.handleMouseEnter(book.altId)}
            onMouseLeave = { () => this.handleMouseLeave()}
          >
            { this.mapIconsToBook(icons, book) }
          </div>
        </div>
      </div>
    );
  }
}

export default Book;