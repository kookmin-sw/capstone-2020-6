import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Table, Icon} from 'semantic-ui-react';
import './PageMypageProject.css';

import {observer, inject} from 'mobx-react';
import MyPageProjectStore from '../stores/MyPageProjectStore';
import Confirm from '../components/TSANConfirm';
import ProjectListTable from '../components/ProjectListTable';
import Datetime from '../components/DateTime';
import UserStore from "../stores/UserStore";

interface Props {
    myPageProjectStore?: MyPageProjectStore;
    userStore?: UserStore;
}
interface State {
    open: boolean;
    type: string;
    projectID: string;
}

@inject('myPageProjectStore')
@inject('userStore')
@observer


class PageMypageProject extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        // 답변 가능한 프로젝트 목록 요청
        this.props.myPageProjectStore!.getProjects();
        this.state = {
            open: false,
            type: '',
            projectID: '',
        }
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    client_header = [
        {id: 1, headerItem: '#'},
        {id: 2, headerItem: '주제명'},
        {id: 3, headerItem: '레이블링 유형'},
        {id: 4, headerItem: '시작일'},
        {id: 5, headerItem: '마감일'},
        {id: 6, headerItem: '시작'},
        {id: 7, headerItem: '종료'},
        {id: 8, headerItem: '보상'},
        {id: 9, headerItem: '비고'},
    ];
    user_header = [
        {id: 1, headerItem: '#'},
        {id: 2, headerItem: '주제명'},
        {id: 3, headerItem: '레이블링 유형'},
        {id: 4, headerItem: '시작일'},
        {id: 5, headerItem: '마감일'},
        {id: 6, headerItem: '비고'},
    ]

    show = (_type:string, idx:string) => {
        this.setState({projectID: idx});
        this.setState({open: true});
        this.setState({type: _type});
    }

    handleConfirm = (idx: string) => {
        this.props.myPageProjectStore?.setId(idx);

        if(this.state.type === 'start')
            this.props.myPageProjectStore?.setStartReq();
        else
            this.props.myPageProjectStore?.setEndReq();

        this.setState({open: false});
        window.location.reload();

    }

    handleCancel = () => {
        this.setState({open: false})
    }

    handleReward = (idx: string) => {
        this.setState({projectID: idx});
        this.props.myPageProjectStore?.setId(idx);
        this.props.myPageProjectStore?.reward();
    }


    render() {
        const {open} = this.state;
        return (
            <Container className="project_cont">
                <h3>내 프로젝트 관리</h3>
                <ProjectListTable header={this.props.userStore?.isRequester ? this.client_header : this.user_header} body={this.props.myPageProjectStore!.list.map((item: any, idx: number) => {
                    return (
                        <Table.Row key={idx}>
                            <Table.Cell>{idx+1}</Table.Cell>
                            <Table.Cell><Link to={`/labeling/${item.id}`}>{item.title}</Link></Table.Cell>
                            <Table.Cell>{item.type}</Table.Cell>
                            <Table.Cell>
                                <Datetime datetime={item.start_date}/>
                            </Table.Cell>
                            <Table.Cell>
                                <Datetime datetime={item.end_date}/>
                            </Table.Cell>
                            {this.props.userStore?.isRequester &&
                                <>
                                    <Table.Cell>
                                    <div onClick={()=>this.show('start', item.id)}>
                                    <Icon name="sign-in alternate"/>
                                    </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <div onClick={()=>this.show('end', item.id)}>
                                    <Icon name="sign-out alternate"/>
                                    </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <div onClick={()=>this.handleReward(item.id)}>
                                    <Icon name="bitcoin"/>
                                    </div>
                                    </Table.Cell>
                                </>
                            }

                            <Table.Cell>{item.status}</Table.Cell>
                        </Table.Row>
                    );
                })}/>
                <Confirm
                    header={'안내'}
                    contents={this.state.type==='start'?['지금 시작하시겠습니까?']:['지금 종료하시겠습니까?']}
                    open={open}
                    handleConfirm={()=>this.handleConfirm(this.state.projectID)}
                    handleCancel={this.handleCancel}
                />
            </Container>
        );
    }
}

// @ts-ignore
export default withRouter(PageMypageProject);
