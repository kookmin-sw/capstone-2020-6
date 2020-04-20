import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Input, Button, Grid} from 'semantic-ui-react';
import "./PageLogin.css"
import JInput from '../components/JInput';
import { inject, observer } from 'mobx-react';
import LoginStore from '../stores/loginStore';
import JSelect from '../components/JSelect';

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
        <div className="box" style={{width: 800}}>
          <div className="login_form_logo">
            <img src="/images/logo.png"/>
          </div>
          <Grid columns={2}>
            <Grid.Column>
              <JInput
                label="이름"
                placeholder="이름을 입력해주세요."
                value={this.props.loginStore?.username}
                onChange={this.props.loginStore?.setUsername}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="아이디"
                placeholder="아이디를 입력해주세요."
                value={this.props.loginStore?.username}
                onChange={this.props.loginStore?.setUsername}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                value={this.props.loginStore?.password}
                onChange={this.props.loginStore?.setPassword}
                type="password"
                style={{marginTop: 15}}
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="비밀번호 확인"
                placeholder="입력하신 비밀번호를 다시 입력해주세요."
                value={this.props.loginStore?.password}
                onChange={this.props.loginStore?.setPassword}
                type="password"
                style={{marginTop: 15}}
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="이메일"
                placeholder="이메일을 입력해주세요."
                value={this.props.loginStore?.username}
                onChange={this.props.loginStore?.setUsername}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Column width={6}>
                  <JSelect
                    label="생일"
                    placeholder="년"
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <JSelect
                    label="&nbsp;"
                    placeholder="월"
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <JSelect
                    label="&nbsp;"
                    placeholder="일"
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
              <JInput
                label="전화번호"
                placeholder="010-0000-0000"
                value={this.props.loginStore?.username}
                onChange={this.props.loginStore?.setUsername}
                type="text"
              />
            </Grid.Column>
            <Grid.Column width={4}>
              &nbsp;
              <Button color="blue" fluid>인증번호 전송</Button>
            </Grid.Column>
            <Grid.Column width={8}>
              <JInput
                label="인증번호"
                placeholder="인증번호를 입력해주세요."
                value={this.props.loginStore?.username}
                onChange={this.props.loginStore?.setUsername}
                type="text"
              />
            </Grid.Column>
          </Grid>
          <br/>
          <button className="login_form_btn login_btn">회원가입</button>
          <div className="login_form_register_area">
            <div>이미 <span>T-SAN</span>의 회원이신가요?</div>
            <button className="login_form_btn">로그인</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(App);
