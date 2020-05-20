import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Table, Icon, Grid} from 'semantic-ui-react';
import './PageMypageProject.css';

import {observer, inject} from 'mobx-react';
import MyPageProjectStore from '../stores/MyPageProjectStore';
import Confirm from "../components/TSANConfirm";
import ProjectListTable from "../components/ProjectListTable";
import Datetime from '../components/DateTime';

interface Props {
    myPageProjectStore?: MyPageProjectStore;
}
interface State {
    open: boolean;
    type: string;
}

@inject('myPageProjectStore')
@observer


class PageMypageProject extends React.Component<Props,State> {
    constructor(props: any) {
        super(props);
        // 답변 가능한 프로젝트 목록 요청
        this.props.myPageProjectStore!.getProjects();
        this.state = {
            open: false,
            type: '',
        }
        this.show = this.show.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
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

    render() {
        const {open} = this.state;
        return (
            <Container className="project_cont">
                <h3>내 프로젝트 관리</h3>
                <ProjectListTable header={this.header} body={this.props.myPageProjectStore!.list.map((item: any, idx: number) => {
                    return (
                        <>
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
                            <Confirm
                                header={'안내'}
                                contents={this.state.type==='start'?['지금 시작하시겠습니까?']:['지금 종료하시겠습니까?']}
                                open={open}
                                handleConfirm={()=>this.handleConfirm(item.id)}
                                handleCancel={this.handleCancel}
                            />
                        </>
                    );
                })}/>
            </Container>
        );
    }
}

// @ts-ignore
export default withRouter(PageMypageProject);
