import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Button, Grid, Checkbox} from 'semantic-ui-react';
import './PageLogin.css';
import JInput from '../components/JInput';
import {inject, observer} from 'mobx-react';
import RegisterStore from '../stores/RegisterStore';
import JSelect from '../components/JSelect';

interface Props extends RouteComponentProps<any>{
  navigate?: any,
  registerStore?: RegisterStore
}

const years:any = []
const months:any = []
const days:any = []

const nowDate:Date = new Date

for(let i:number = nowDate.getFullYear(); i >= 1900;i--) {
    years.push({
        text: i + "년",
        value: i
    })
}

for(let i:number = 1; i<=12;i++) {
    months.push({
        text: i + "월",
        value: i
    })
}

for(let i:number = 1; i<=31;i++) {
    days.push({
        text: i + "일",
        value: i
    })
}

@inject('registerStore') @observer
class App extends React.Component<Props> {
  render() {
    console.log(this.props.navigate)
    return (
      <Container>
        <div className="box" style={{width: 800}}>
          <div className="login_form_logo">
            <img src="/images/logo.png" alt='logo'/>
          </div>
          <Grid columns={2}>
            <Grid.Column>
              <JInput
                label="이름"
                placeholder="이름을 입력해주세요."
                value={this.props.registerStore?.fullname}
                onChange={this.props.registerStore?.setFullname}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="아이디"
                placeholder="아이디를 입력해주세요."
                value={this.props.registerStore?.username}
                onChange={this.props.registerStore?.setUsername}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                value={this.props.registerStore?.password}
                onChange={this.props.registerStore?.setPassword}
                type="password"
                style={{marginTop: 15}}
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="비밀번호 확인"
                placeholder="입력하신 비밀번호를 다시 입력해주세요."
                value={this.props.registerStore?.passwordCheck}
                onChange={this.props.registerStore?.setPasswordCheck}
                type="password"
                style={{marginTop: 15}}
              />
            </Grid.Column>
            <Grid.Column>
              <JInput
                label="이메일"
                placeholder="이메일을 입력해주세요."
                value={this.props.registerStore?.email}
                onChange={this.props.registerStore?.setEmail}
                type="text"
              />
            </Grid.Column>
            <Grid.Column>
              <Grid>
                <Grid.Column width={6}>
                  <JSelect
                    label="생년월일"
                    placeholder="년"
                    options={years}
                    value={this.props.registerStore?.year}
                    onChange={this.props.registerStore?.setYear}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <JSelect
                    label="&nbsp;"
                    placeholder="월"
                    options={months}
                    value={this.props.registerStore?.month}
                    onChange={this.props.registerStore?.setMonth}
                  />
                </Grid.Column>
                <Grid.Column width={5}>
                  <JSelect
                    label="&nbsp;"
                    placeholder="일"
                    options={days}
                    value={this.props.registerStore?.date}
                    onChange={this.props.registerStore?.setDate}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={16}>
              <JInput
                label="전화번호"
                placeholder="010-0000-0000"
                value={this.props.registerStore?.phone}
                onChange={this.props.registerStore?.setPhone}
                type="text"
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Checkbox
                onChange={this.props.registerStore?.setIsRequester}
                value={this.props.registerStore?.isRequester}
              />
              <span style={{position: "relative", top: -3.5, left: 5}}>저는 의뢰자로 가입합니다.</span>
            </Grid.Column>
          </Grid>
          <br/>
          <button className="login_form_btn login_btn" onClick={this.props.registerStore?.submit}>회원가입</button>
          <div className="login_form_register_area">
            <div>이미 <span>T-SAN</span>의 회원이신가요?</div>
            <button className="login_form_btn" onClick={() => {window.location.href="/login"}}>로그인</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(App);
