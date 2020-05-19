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
interface State {
    open: boolean;
    type: string;
}

@inject('myPageProjectStore')
@observer

// const formatDate = () => {
//
// }

class PageMypageProject extends React.Component<Props,State> {
    constructor(props: any) {
        super(props);
        // 답변 가능한 프로젝트 목록 요청
        this.props.myPageProjectStore!.getAvailableProject();
        this.state = {
            open: false,
            type: '',
        }
        this.show = this.show.bind(this);
    }
    header = [
        {id: 1, headerItem: '#'},
        {id: 2, headerItem: '주제명'},
        {id: 3, headerItem: '레이블링 유형'},
        {id: 4, headerItem: '시작일'},
        {id: 5, headerItem: '마감일'},
        {id: 6, headerItem: '시작'},
        {id: 7, headerItem: '종료'},
        {id: 8, headerItem: '비고'},
    ];

    show = (_type:string) => {
        this.setState({open: true});
        this.setState({type: _type});
    }

    handleConfirm = () => {
        // TODO: API 연동
        this.setState({open: false})
    }
    handleCancel = () => {
        this.setState({open: false})
    }

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
                                    <div onClick={()=>this.show('start')}>
                                        <Icon name="sign-in alternate"/>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div onClick={()=>this.show('end')}>
                                        <Icon name="sign-out alternate"/>
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{item.status}</Table.Cell>
                            </Table.Row>
                        </>
                    );
                })}/>

                <Confirm
                    header={'안내'}
                    contents={this.state.type==='start'?['지금 시작하시겠습니까?']:['지금 종료하시겠습니까?']}
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
