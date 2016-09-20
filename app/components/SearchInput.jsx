import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/searchInput';
const cx = classNames.bind(styles);

class SearchInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {useStyles, label, id, type, value, clickEvent, changeEvent, placeholder } = this.props;
    return (
      <div className={cx(useStyles.wrapper)}>
        { label ? (<label htmlFor= {label} >{label + ': '}</label>) : null}
        <input 
          className={cx(useStyles.input)}
          type = {type} 
          id={id || label} 
          placeholder={placeholder} 
          value={value} 
          onClick={clickEvent} 
          onChange = {changeEvent}/>
      </div>
    );
  }
}

export default SearchInput;