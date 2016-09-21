import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logOut } from 'actions/users';
import { resetView } from 'actions/books';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.filterLinks = this.filterLinks.bind(this);
    this.mapLinks = this.mapLinks.bind(this);
  }

  filterLinks(links, auth) {
    return auth ? links : links.filter(link => !link.authRequired);
  }

  mapLinks(auth, selected, actions) {
    const links = [{
      href: '/',
      authRequred: false,
      name: 'Home'
    }, {
      href: '/addbook',
      authRequired: true, 
      name: 'Add Book',
      onClick: actions.resetView
    }, {
      href: '/mybooks',
      authRequired: true,
      name: 'My Books'
    }, {
      href: '/mytrades',
      authRequired: true,
      name: 'My Trades'
    }, {
      href: '/settings',
      authRequired: true,
      name: 'Settings'
    }];

    return this.filterLinks(links, auth).map((link) => {
      const { href, name, onClick } = link;
       return (
        <Link 
          key={name} 
          to={href} 
          className={cx({navLink: true, selected: selected === href})}
          onClick = { onClick || null }
        >
          <li className={cx({linkName: true})}>{name}</li>
        </Link>
      );
    });
  }

  render() {
    const { user, logOut, routing, resetView } = this.props;
    const auth = user.authenticated;
    const pathname = routing && routing.locationBeforeTransitions ? routing.locationBeforeTransitions.pathname : null;
    return (
      <nav className={cx('navigation')}>
        <ul className={cx('linkList')}>
          {this.mapLinks(auth, pathname, {resetView})}
          <a 
            href={auth ? '/logout' : '/auth/google'} 
            onClick = { auth ? logOut : null}
            className={cx('navLink')}
          >
            <li className={cx('linkName')}>{auth ? 'Logout' : 'Google Login'}</li>
          </a>
        </ul>
      </nav>
    );
  }
};

function mapStateToProps({user, routing}) {
  return {
    user,
    routing
  };
};

export default connect(mapStateToProps, {logOut, resetView })(Navigation);