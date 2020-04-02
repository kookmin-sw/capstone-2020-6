import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';

import Avatar from './Avatar';
import './Navigation.css';

interface Props extends RouteComponentProps<any> {
    id?: string
    thumbnail?: string
}

// eslint-disable-next-line require-jsdoc
class Navigation extends React.Component<Props> {
  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <div className='navigation'>
        <div className='logo'>
          <Link to='/'>
            <img className='logo' src='/logo.png'/>
          </Link>
        </div>
        <div className='menu'>
          <div className='menu_item'>
            <Link className='text' to="/about">About</Link>
          </div>
          <div className='menu_item'>
            <Link className='text' to="/login">Login</Link>
          </div>
          <div className='menu_item'>
            <Link className='text' to="/register">Register</Link>
          </div>
          <div className='avatar'>
            <Avatar/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);
