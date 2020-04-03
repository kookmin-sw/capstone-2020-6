import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import './Navigation.css';

// for Mobx
import { observer, inject } from 'mobx-react';
import NavigationStore from '../stores/NavigationStore';

interface Props {
  navigationStore?: NavigationStore;
}

// eslint-disable-next-line require-jsdoc
@inject('navigationStore')
@observer
class Navigation extends React.Component<Props> {
  // eslint-disable-next-line require-jsdoc
  constructor(props: any) {
    super(props);
    this.props.navigationStore!.getAvatarThumbnail();
    this.props.navigationStore!.getUserId();
  }
  render() {
    return (
      <div className='navigation'>
        <Container>
          <div className='logo'>
            <Link to='/'>
              <img className='logo' src='/images/logo.png' />
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
            <div className='menu_item'>
              <Link className='text' to="/mypage">Mypage</Link>
            </div>
            {/* <div className='avatar'>
            <Link to={{
              pathname: '/mypage',
              search: `userId=${this.props.navigationStore!.userId}`,
            }}>
              <Avatar userId={this.props.navigationStore!.userId}
                thumbnail={this.props.navigationStore!.thumbnail}/>
            </Link>d
          </div> */}
          </div>
        </Container>
      </div>
    );
  }
}

export default Navigation;
