import React, { Component, PropTypes } from 'react';
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
    
    this.refs.multiBook.setAttribute("style","width:" + multiBookWidth  + 'px');
    changeMultiBookWidth(multiBookWidth);
  }

  segmentBooks(books, max) {
    return books.reduce((prev, curr, i) => {
      const toAdd = (i % max) ? prev.pop().concat(curr) : [curr];
      prev.push(toAdd);
      return prev;
    }, []);
  }

  mapRowsToView(books, width, icons, bookSize, dimensions) {
    const boxWidth = dimensions.width + dimensions.margin*2;
    const max = Math.floor(width/boxWidth);
    const margin = max > 0 ? (width - boxWidth*max)/2 : 0;

    return this.segmentBooks(books, max).map((segment, i, arr) => {
      return (
        <div key={i} className={cx({row: true})} style={{'marginLeft': margin, 'marginRight': margin}} >
          { this.mapBooksToRow(segment, bookSize, icons, dimensions) }
        </div>
      )
    })
  }

  mapBooksToRow(books, bookSize, icons, dimensions) {
    const { width, margin } = dimensions;

    return books.map((book) => {
      return (
        <div key={book.altId} className={cx('book')} style={{'marginLeft': margin, 'marginRight': margin, width: width}}>
          <div className={cx('bookWrap')}>
            <img 
              src={book.image ? (bookSize === 'small' ? book.image.replace('zoom=2', 'zoom=1') : book.image) : galaxy} 
              className = {cx('bookImg')}
            />
            <div className={cx('bookFilter')}>
              { this.mapIconsToBook(icons, book) }
            </div>
          </div>
        </div>
      );
    });
  }

  mapIconsToBook(icons, book) {
    return icons.map((icon, i) => {
      return (
        <i key={i} onClick={(e) => icon.func(book) } className={cx(icon.classes)}> </i>
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
};

function mapStateToProps({client}) {
  return {
    client
  };
};

export default connect(mapStateToProps, {mountMultiBook, changeMultiBookWidth})(MultiBook);