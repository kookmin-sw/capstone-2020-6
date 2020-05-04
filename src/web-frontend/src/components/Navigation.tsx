import React from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import './Navigation.css';

// for Mobx
import {observer, inject} from 'mobx-react';
import NavigationStore from '../stores/NavigationStore';
import LoginStore from '../stores/loginStore';

interface Props {
  navigationStore?: NavigationStore;
  loginStore?: LoginStore;
}

// eslint-disable-next-line require-jsdoc
@inject('navigationStore', 'loginStore')
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
              <img className='logo' src='/images/logo.png' alt='logo'/>
            </Link>
          </div>
          <div className='menu'>
            <div className='menu_item'>
              <Link className='text' to="/about">소개</Link>
            </div>
            {
              this.props.loginStore?.is_login ? (
                <>
                  <div className='menu_item'>
                    <Link className='text' to="/mypage">마이페이지</Link>
                  </div>
                  <div className='menu_item'>
                    <div className='text' onClick={this.props.loginStore?.logout}>로그아웃</div>
                  </div>
                </>
              ) : (
                <>
                  <div className='menu_item'>
                    <Link className='text' to="/login">로그인</Link>
                  </div>
                  <div className='menu_item'>
                    <Link className='text' to="/register">회원가입</Link>
                  </div>
                </>
              )
            }
          </div>
        </Container>
      </div>
    );
  }
}

export default Navigation;
