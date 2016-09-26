import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSettings } from 'actions/users';
import classNames from 'classnames/bind';
import styles from 'css/pages/settings';

const cx = classNames.bind(styles);

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //Incase we come from a page where the scroll bar is positioned
    window.scrollTo(0, 0);
  }

  handleSubmit(e) {
    const { updateSettings } = this.props; 
    const { target } = e;
    e.preventDefault();
    const settings = ['firstName', 'lastName', 'city', 'state'];
    const settingsData = settings.reduce((prev, next) => {
      const value = target[next].value.trim();
      if(value) {
        prev[next] = value;
      }
      return prev;
    }, {});
    updateSettings(settingsData);

  }

  render() {
    const { user: { userInfo: {firstName, lastName, city, state} } } = this.props;
    return (
      <div className={cx('body')}>
        <form className={cx('form')} onSubmit={(e) => this.handleSubmit(e) }>
          <h2>Settings</h2>
          <div className={cx('inputArea')}>
            <label htmlFor={'firstName'}>First Name: </label>
            <span>{firstName}</span>
            <input type ={'text'} id={'firstName'}></input>
          </div>
          <div className={cx('inputArea')}>
            <label htmlFor={'lastName'}>Last Name: </label>
            <span>{lastName}</span>
            <input type ={'text'} id={'lastName'} ></input>
          </div>
          <div className={cx('inputArea')}>
            <label htmlFor={'city'}>City: </label>
            <span>{city}</span>
            <input type ={'text'} id={'city'} ></input>
          </div>
          <div className={cx('inputArea')}>
            <label htmlFor={'state'}>State: </label>
            <span>{state}</span>
            <input type ={'text'} id={'state'} ></input>
          </div>
          <div className={cx('submit')}>
            <input type={'submit'}/>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { updateSettings })(Settings);