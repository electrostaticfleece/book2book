import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

//const cx = classNames.bind(styles);

const SearchInput = ({useStyle, label, type, value, clickEvent, changeEvent }) => {
  return (
    <div>
      { label ? (<label htmlFor= {label} >{label + ': '}</label>) : null}
      <input type = {type} id={label} value={value} onClick={clickEvent} onChange = {changeEvent}/>
    </div>
  );
};

export default SearchInput;