import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import { inject, observer } from 'mobx-react';
import LoginStore from '../stores/loginStore';

interface Props extends RouteComponentProps<any>{
  navigate?: any,
  match: any,
  history: any,
  loginStore?: LoginStore
}

@inject("loginStore") @observer
class App extends React.Component<Props> {
  login = () => {
    this.props.loginStore?.login()
    .then(({data}:any) => {
      if(!data.loginAccount.message.status) {
        alert(data.loginAccount.message.message)
        return
      }
      localStorage.setItem("token", data.loginAccount.jwt)
      this.props.loginStore?.setJwt(data.loginAccount.jwt)
      this.props.history.push("/")
    })
    .catch((err:any) => {
      console.error(err)
      alert("알 수 없는 에러가 발생하였습니다.")
    })
  }
  render() {
    return (
      <Container>
        <div className="box">
          <div className="login_form_logo">
            <img src="/images/logo.png" alt='logo'/>
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
          <button
            className="login_form_btn login_btn"
            onClick={
              this.login
            }
          >
              로그인
          </button>
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
