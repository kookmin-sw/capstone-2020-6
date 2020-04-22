import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Input, Button} from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import { inject, observer } from 'mobx-react';
import LoginStore from '../stores/loginStore';

interface Props extends RouteComponentProps<any>{
  navigate?: any,
  loginStore?: LoginStore
}

@inject("loginStore") @observer
class App extends React.Component<Props> {
  render() {
    console.log(this.props.navigate)
    return (
      <Container>
        <div className="box">
          <div className="login_form_logo">
            <img src="/images/logo.png"/>
          </div>
          <JInput
            label="아이디"
            placeholder="아이디를 입력해주세요."
            value={this.props.loginStore?.username}
            onChange={this.props.loginStore?.setUsername}
            type="text"
          />
          <JInput
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            value={this.props.loginStore?.password}
            onChange={this.props.loginStore?.setPassword}
            type="password"
            style={{marginTop: 15}}
          />
          <button className="login_form_btn login_btn">로그인</button>
          <div className="login_form_register_area">
            <div>아직 <span>T-SAN</span> 회원이 아니신가요?</div>
            <button className="login_form_btn">회원가입</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(App);
