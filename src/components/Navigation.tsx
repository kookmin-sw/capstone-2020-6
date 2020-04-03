import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';

import Avatar from './Avatar';
import './Navigation.css';

// for Mobx
import {observer, inject} from 'mobx-react';
import AvatarStore from '../stores/Avatar';

interface Props {
    avatarStore?: AvatarStore;
}

// eslint-disable-next-line require-jsdoc
@inject('avatarStore')
@observer
class Navigation extends React.Component<Props> {
  // eslint-disable-next-line require-jsdoc
  constructor(props: any) {
    super(props);
    this.props.avatarStore!.getAvatar();
  }
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
            <Avatar thumbnail={this.props.avatarStore!.thumbnail}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
