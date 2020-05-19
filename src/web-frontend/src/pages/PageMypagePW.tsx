import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Container, Button} from 'semantic-ui-react';
import './PageMypagePW.css';

import Confirm from '../components/TSANConfirm';

// for Mobx
// import {observer, inject} from "mobx-react";
import JInput from '../components/JInput';
import LoginStore from '../stores/loginStore';
import { observer, inject } from 'mobx-react';

interface Props extends RouteComponentProps<any> {
    navigate?: any
    loginStore?: LoginStore
}

@inject("loginStore") @observer
class PageMypagePW extends React.Component<Props> {
    state = {open: false}
    show = () => this.setState({open: true})
    // TODO: 사용시, 그 상황에 맞는 함수 작성해야할 것
    handleConfirm = () => {
        this.props.loginStore?.changePassword()
        this.setState({open: false})
    }
    handleCancel = () => this.setState({open: false})

    goBack = () => this.props.history.push(`/mypage`);

    render() {
        const {open} = this.state;

        return (
            <Container className="mypage_pw">
                <div className="page-title">마이페이지</div>
                <Header as='h3'>비밀번호 변경</Header>
                <p>안전한 비밀번호로 내 정보를 보호하세요.</p>
                <p className="mp_content">* <span>다른 아이디/사이트에서 사용한 적 없는 비밀번호</span></p>
                <p className="mp_content">* <span>이전에 사용한 적 없는 비밀번호</span>가 안전합니다.</p>
                <JInput
                    label="기존 비밀번호"
                    placeholder="기존 비밀번호를 입력해주세요."
                    value={this.props.loginStore?.oldPassword}
                    onChange={this.props.loginStore?.setOldPassword}
                    type="password"
                    style={{marginTop: 30}}
                />
                <JInput
                    label="새 비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    value={this.props.loginStore?.password}
                    onChange={this.props.loginStore?.setPassword}
                    type="password"
                    style={{marginTop: 30}}
                />
                <JInput
                    label="새 비밀번호 확인"
                    placeholder="입력하신 비밀번호를 다시 입력해주세요."
                    value={this.props.loginStore?.passwordCheck}
                    onChange={this.props.loginStore?.setPasswordCheck}
                    type="password"
                    style={{marginTop: 15, marginBottom: 30}}
                />
                <div className="btn_group">
                    <Button
                        className="mp_btn"
                        onClick={this.goBack}>
                        뒤로가기
                    </Button>
                    <Button
                        className="mp_btn"
                        color="blue"
                        style={{marginBottom: 10}}
                        onClick={this.show}>
                        비밀번호 변경
                    </Button>
                </div>
                <Confirm
                    header={'안내'}
                    contents={['정말로 비밀번호를 변경하시겠습니까?']}
                    open={open}
                    handleConfirm={this.handleConfirm}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

export default withRouter(PageMypagePW);
