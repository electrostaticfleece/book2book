import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import SearchInput from 'components/SearchInput';
import styles from 'css/components/searchForm';

const cx = classNames.bind(styles);

const SearchForm = ({handleSubmit, typing, findBook, input, addBook}) => {
  return (
    <form onSubmit= { handleSubmit } >
      <SearchInput useStyles={'searchForm'} label={'Author'} value={input.addBook.inauthor} type={'search'} changeEvent={typing} />
      <SearchInput useStyles={'searchForm'} label={'Title'} value={input.addBook.intitle} type={'search'} changeEvent={typing} />
      <SearchInput useStyles={'button'} value = {'Find Book'} type={'button'} clickEvent={ findBook } />
      <SearchInput useStyles={'button'} value = {'Add Book'} type={'submit'} />
    </form>
  );
};

export default SearchForm;