import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container, Button} from 'semantic-ui-react';
import "./PageMypagePW.css";

// for Mobx
import {observer, inject} from "mobx-react";
import JInput from "../components/JInput";
import LoginStore from "../stores/loginStore";

interface Props extends RouteComponentProps<any> {
    navigate?: any
    loginStore?: LoginStore
}

class PageMypagePW extends React.Component<Props> {

    render() {
        return (
            <Container textAlign="center" className="mypage_pw">
                <Header as='h3'>비밀번호 변경</Header>
                <p>안전한 비밀번호로 내 정보를 보호하세요.</p>
                <p className="mp_content">* <em>다른 아이디/사이트에서 사용한 적 없는 비밀번호</em></p>
                <p className="mp_content">* <em>이전에 사용한 적 없는 비밀번호</em>가 안전합니다.</p>
                <Grid columns={1}>
                    <Grid.Column>
                        <JInput
                            label="새 비밀번호"
                            placeholder="비밀번호를 입력해주세요."
                            value={this.props.loginStore?.password}
                            onChange={this.props.loginStore?.setPassword}
                            type="password"
                            style={{marginTop: 15}}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <JInput
                            label="새 비밀번호 확인"
                            placeholder="입력하신 비밀번호를 다시 입력해주세요."
                            value={this.props.loginStore?.password}
                            onChange={this.props.loginStore?.setPassword}
                            type="password"
                            style={{marginTop: 15}}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Button className="mp_btn" color="blue"> 확인 </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button className="mp_btn"> 취소 </Button>
                    </Grid.Column>
                </Grid>
            </Container>

        );
    }
}

export default withRouter(PageMypagePW);
