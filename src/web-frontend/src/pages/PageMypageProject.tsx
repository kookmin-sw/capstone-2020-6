import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Table, Icon} from 'semantic-ui-react';
import './PageMypageProject.css';

import {observer, inject} from 'mobx-react';
import MyPageProjectStore from '../stores/MyPageProjectStore';
import Confirm from "../components/TSANConfirm";
import ProjectListTable from "../components/ProjectListTable";

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
    header = [
        {id: 1, headerItem: '#'},
        {id: 2, headerItem: '주제명'},
        {id: 3, headerItem: '레이블링 유형'},
        {id: 4, headerItem: '시작일'},
        {id: 5, headerItem: '마감일'},
        {id: 6, headerItem: '수정'},
        {id: 7, headerItem: '삭제'},
        {id: 8, headerItem: '비고'},
    ];

    state = {open: false}
    show = () => this.setState({open: true})

    handleConfirm = () => this.setState({open: false})
    handleCancel = () => this.setState({open: false})

    render() {
        const {open} = this.state;
        return (
            <Container className="project_cont">
                <h3>내 프로젝트 관리</h3>
                <ProjectListTable header={this.header} body={this.props.myPageProjectStore!.list.map((item: any) => {
                    return (
                        <>
                            <Table.Row>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell><Link to={`/labeling/${item.id}`}>{item.title}</Link></Table.Cell>
                                <Table.Cell>{item.type}</Table.Cell>
                                <Table.Cell>2020.02.03</Table.Cell>
                                <Table.Cell>2020.03.03</Table.Cell>
                                <Table.Cell>
                                    <Link to={'/updateRegister'}>
                                        <Icon name="pencil alternate"/>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <div onClick={this.show}>
                                        <Icon name="trash alternate"/>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{item.status}</Table.Cell>
                            </Table.Row>
                        </>
                    );
                })}/>

                <Confirm
                    header={'안내'}
                    contents={['프로젝트를 정말로 삭제하시겠습니까?']}
                    open={open}
                    handleConfirm={this.handleConfirm}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

// @ts-ignore
export default withRouter(PageMypageProject);
