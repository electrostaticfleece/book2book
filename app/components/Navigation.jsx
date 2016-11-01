import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { resetView } from 'actions/books';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.filterLinks = this.filterLinks.bind(this);
    this.mapLinks = this.mapLinks.bind(this);
    this.setExpanded = this.setExpanded.bind(this);
  }

  filterLinks(links, auth) {
    return auth ? links : links.filter(link => !link.authRequired);
  }

  setExpanded(){
    this.setState((state) => {
      return {expanded: !state.expanded};
    });
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
          className={cx({
            navLink: true, 
            selected: selected === href
          })}
          onClick = { ()=> { 
            this.setState({expanded: false});
            if(onClick){
              onClick();
            }
          } }
        >
          <li className={cx({linkName: true})}>{name}</li>
        </Link>
      );
    }).concat(
        <a 
          href={auth ? '/logout' : '/auth/google'} 
          className={cx('navLink')}
        >
          <li className={cx('linkName')}>{auth ? 'Logout' : 'Google Login'}</li>
        </a>
    );
  }

  render() {
    const { user, resetView, location} = this.props;
    const auth = user.authenticated;
    const pathname = location.pathname;
    return (
      <nav className={cx({navigation: true, expanded: this.state.expanded})}>
        <ul className={cx('linkList')}>
          <div
            className={cx({menuButton: true})}
            onClick={this.setExpanded}
          >
            <span className={cx({middleStripe: true})}></span>
          </div>
          {this.mapLinks(auth, pathname, {resetView})}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({user, routing}) {
  return {
    user,
    routing
  };
}

export default connect(mapStateToProps, {resetView })(Navigation);