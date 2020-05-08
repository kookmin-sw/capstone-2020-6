import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Label, Table, Header, Icon} from 'semantic-ui-react';
import './PageMypageProject.css';

import CardProject from '../components/CardProject';
import {observer, inject} from 'mobx-react';
import MyPageProjectStore from '../stores/MyPageProjectStore';
import Confirm from "../components/TSANConfirm";

interface Props {
    myPageProjectStore?: MyPageProjectStore;
}

@inject('myPageProjectStore')
@observer

// const formatDate = () => {
//
// }

class PageMypageProject extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        // 답변 가능한 프로젝트 목록 요청
        this.props.myPageProjectStore!.getAvailableProject();
    }

    state = {open: false}
    show = () => this.setState({open: true})

    handleConfirm = () => this.setState({open: false})
    handleCancel = () => this.setState({open: false})

    render() {
        const {open} = this.state;
        return (
            <Container className="project_cont">
                <h3>내 프로젝트 관리</h3>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>주제명</Table.HeaderCell>
                            <Table.HeaderCell>시작일</Table.HeaderCell>
                            <Table.HeaderCell>마감일</Table.HeaderCell>
                            <Table.HeaderCell>수정</Table.HeaderCell>
                            <Table.HeaderCell>삭제</Table.HeaderCell>
                            <Table.HeaderCell>비고</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.myPageProjectStore!.list.map((item: any) => {
                            return (
                                <>
                                    <Table.Row>
                                        <Table.Cell>{item.id}</Table.Cell>
                                        <Table.Cell>{item.title}</Table.Cell>
                                        <Table.Cell>2020.02.03</Table.Cell>
                                        <Table.Cell>2020.03.03</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/updateRegister`}>
                                                <Icon name="pencil"/>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div onClick={this.show}>
                                                <Icon name="trash alternate"/>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>완료</Table.Cell>
                                    </Table.Row>
                                </>
                            );
                        })}
                        <Confirm
                            header={'안내'}
                            contents={['프로젝트를 정말로 삭제하시겠습니까?']}
                            open={open}
                            handleConfirm={this.handleConfirm}
                            handleCancel={this.handleCancel}
                        />
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

// @ts-ignore
export default withRouter(PageMypageProject);
