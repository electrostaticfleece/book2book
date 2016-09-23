import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { mountMultiBook, changeMultiBookWidth } from 'actions/client';
import styles from 'css/components/multiBook';
import Book from 'components/MultiBook/Book';

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
    const { mountMultiBook } = this.props;
    mountMultiBook(false);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { changeMultiBookWidth, percentOfPage } = this.props;
    const multiBookWidth =  Math.round(document.body.clientWidth * percentOfPage);
    
    this.refs.multiBook.setAttribute('style','width:' + multiBookWidth  + 'px');
    changeMultiBookWidth(multiBookWidth);
  }

  segmentBooks(books, max) {
    return (books || []).reduce((prev, curr, i) => {
      const toAdd = (i % max) ? prev.pop().concat(curr) : [curr];
      prev.push(toAdd);
      return prev;
    }, []);
  }

  mapRowsToView(books, width, icons, bookSize, dimensions, wrap) {
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
          { this.mapBooksToRow(segment, bookSize, icons, dimensions, wrap) }
        </div>
      );
    });
  }

  mapBooksToRow(segment, bookSize, icons, dimensions, wrap) {
    const { highlight } = this.props;
    return segment.map((book) => {
      return (
        <Book
          book={book}
          bookSize={bookSize}
          icons={icons}
          dimensions={dimensions}
          highlight = {highlight}
          hover = {wrap}
          key = {book.altId}
        />
      );
    });
  }

  render() {
    const { books, bookSize, icons, client, dimensions, wrap } = this.props;
    return (

      <div className={cx('multiBook')} ref={'multiBook'}>
        { 
          books && books.length > 0 ?
          this.mapRowsToView(books, client.multiBook.width , icons, bookSize, dimensions, wrap) :
          null 
        }
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