import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';
import './PageMypageProject.css';

import CardProject from '../components/CardProject';
import {observer, inject} from 'mobx-react';
import MyPageProjectStore from '../stores/MyPageProjectStore';

interface Props {
    myPageProjectStore?: MyPageProjectStore;
}

@inject('myPageProjectStore')
@observer


class PageMypageProject extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        // 답변 가능한 프로젝트 목록 요청
        this.props.myPageProjectStore!.getAvailableProject();
    }

    render() {
        return (
            <Container className="project_cont">
                <h3>진행중인 라벨링 프로젝트</h3>
                <Grid columns={4}>
                    {this.props.myPageProjectStore!.list.map((item: any, key: any) => {
                        return (
                            <Grid.Column key={key}>
                                <CardProject
                                    id={item.id}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    author={item.author}
                                    start_date={item.start_date}
                                    end_date={item.end_date}
                                    type={item.type}
                                    point={item.point}
                                    description={item.description}
                                    progress={item.progress}
                                    all={item.all}
                                    progress_rate={item.progress_rate}
                                    status={'client'}
                                />
                            </Grid.Column>
                        );
                    })}
                </Grid>
                <h3>완료된 라벨링 프로젝트</h3>
                <Grid columns={4}>
                    {this.props.myPageProjectStore!.list.map((item: any, key: any) => {
                        return (
                            <Grid.Column key={key}>
                                <CardProject
                                    id={item.id}
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    author={item.author}
                                    start_date={item.start_date}
                                    end_date={item.end_date}
                                    type={item.type}
                                    point={item.point}
                                    description={item.description}
                                    progress={item.progress}
                                    all={item.all}
                                    progress_rate={item.progress_rate}
                                    status={'client'}
                                />
                            </Grid.Column>
                        );
                    })}
                </Grid>
            </Container>
        );
    }
}

// @ts-ignore
export default withRouter(PageMypageProject);
