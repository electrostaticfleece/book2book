import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { mountMultiBook, changeMultiBookWidth } from 'actions/client';
import styles from 'css/components/multiBook';
import galaxy from 'images/galaxy.gif';

const cx = classNames.bind(styles);

class MultiBook extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.hanldeMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      selected: null
    };
  }

  componentDidMount() {
    const { mountMultiBook, changeMultiBookWidth } = this.props;
    const multiBookWidth = this.refs.multiBook.clientWidth;

    mountMultiBook(true);
    changeMultiBookWidth(multiBookWidth);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { changeMultiBookWidth, percentOfPage } = this.props;
    const multiBookWidth =  Math.round(document.body.clientWidth * percentOfPage);
    
    this.refs.multiBook.setAttribute('style','width:' + multiBookWidth  + 'px');
    changeMultiBookWidth(multiBookWidth);
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

  segmentBooks(books, max) {
    return (books || []).reduce((prev, curr, i) => {
      const toAdd = (i % max) ? prev.pop().concat(curr) : [curr];
      prev.push(toAdd);
      return prev;
    }, []);
  }

  mapRowsToView(books, width, icons, bookSize, dimensions) {
    const boxWidth = dimensions.width + dimensions.margin*2;
    const max = Math.floor(width/boxWidth);
    const margin = max > 0 ? (width - boxWidth*max)/2 : 0;

    return this.segmentBooks(books, max).map((segment, i) => {
      return (
        <div 
          key={i} 
          className={cx({row: true})} 
          style={{'marginLeft': margin, 'marginRight': margin}} 
        >
          { this.mapBooksToRow(segment, bookSize, icons, dimensions) }
        </div>
      );
    });
  }

  mapBooksToRow(books, bookSize, icons, dimensions) {
    const { width, margin } = dimensions;
    const { highlight } = this.props;

    return books.map((book) => {
      return (
        <div 
          key={book.altId} 
          className={cx('book')} 
          style={{'marginLeft': margin, 'marginRight': margin, width: width}}
        >
          <div className={cx({ bookWrap: true} )}>
            <img 
              src={book.image ? (bookSize === 'small' ? book.image.replace('zoom=2', 'zoom=1') : book.image) : galaxy} 
              className = {cx('bookImg')}
            />
            <div 
              className={cx({
                filterLayer: true,
                bookFilter: !highlight, 
                highlight: this.state.selected === book.altId, 
                fade: this.state.selected && this.state.selected !== book.altId
              })}
              onMouseEnter = { () => this.handleMouseEnter(book.altId)}
              onMouseLeave = { () => this.handleMouseLeave()}
            >
              { this.mapIconsToBook(icons, book) }
            </div>
          </div>
        </div>
      );
    });
  }

  mapIconsToBook(icons, book) {
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
    const { books, bookSize, icons, client, dimensions } = this.props;

    return (
      <div className={cx('multiBook')} ref={'multiBook'}>
        {this.mapRowsToView(books, client.multiBook.width , icons, bookSize, dimensions)}
      </div>
    );
  }
}

function mapStateToProps({client}) {
  return {
    client
  };
}

export default connect(mapStateToProps, {mountMultiBook, changeMultiBookWidth})(MultiBook);