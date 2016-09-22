import React, { Component } from 'react';
import classNames from 'classnames/bind';
import SearchInput from 'components/Search/SearchInput';
import styles from 'css/components/searchForm';

const cx = classNames.bind(styles);

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.findBook = this.findBook.bind(this);
    this.typing = this.typing.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  findBook() {
    const { status, getBook } = this.props;
    if(typeof status === 'undefined' || status === 'Success') {
      getBook(0, true);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.findBook();
  }

  typing(e) {
    e.preventDefault();
    const { typing } = this.props;
    if(typeof e.target.value === 'string') {
      typing({
        value: e.target.value, 
        source: e.target.id
      });
    }
  }

  render() {
    const { value } = this.props;
    return (
      <form className={cx('searchForm')} onSubmit= { this.handleSubmit } >
        <SearchInput 
          useStyles={{input: 'searchInput', wrapper: 'searchWrapper'}} 
          value={value} 
          type={'search'} 
          changeEvent={this.typing} 
          id={'addBookQuery'}
          placeholder={'Search for a book to add to your collection'}
        />
        <div className={cx('searchWrap')} >
          <i 
            onClick = { this.findBook } 
            value = {'Find Book'}
            className={cx({'icon': true, 'search-icon': true})}
            title={'Serach for book'}
          >
          </i>
        </div>
      </form>
    );
  }
}

export default SearchForm;