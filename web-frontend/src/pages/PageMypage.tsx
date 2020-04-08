import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container, Button} from 'semantic-ui-react';
import './PageMyPage.css'

// Components
import MypageCard from "../components/MypageCard";
import Confirm from "../components/TSANConfirm";
// for Mobx
import {observer, inject} from "mobx-react";
import MyPageListStore from "../stores/MyPageListStore";

interface Props extends RouteComponentProps<any> {
    navigate?: any
    myPageListStore?: MyPageListStore;
}

@inject("myPageListStore")
@observer
class Mypage extends React.Component<Props> {

    constructor(props: any) {
        super(props);
        this.props.myPageListStore!.getAvailableMyPageList();
    }

    // confirm test
    state = { open: false }
    show = () => this.setState({ open: true })
    // TODO: 사용시, 그 상황에 맞는 함수 작성해야할 것
    handleConfirm = () => this.setState({ open: false })
    handleCancel = () => this.setState({ open: false })

    contents = ['* 한 번 취소된 프로젝트는 다시 복구할 수 없습니다.',
        '* 프로젝트 취소로 인한 수수료는 의뢰자가 부담합니다.',
    '* 정말로 취소하시겠습니까?'];
    // end

    render() {
        console.log(this.props.myPageListStore!.list);
        // Popup test
        const {open} = this.state;

        return (

            <div className="page">
                <Container>

                    {/*confirm test*/}
                    <Button
                        content='confirm test'
                        positive
                        onClick={this.show}
                    />
                    <Confirm
                        header={'경고'}
                        contents={this.contents}
                        open={open}
                        handleConfirm={this.handleConfirm}
                        handleCancel={this.handleCancel}
                    />
                    {/*end*/}

                    <Grid columns={3}>
                        {this.props.myPageListStore!.list.map((item: any, key:any) => {
                            return (
                                <Grid.Column className="_grid" key={key}>
                                    <MypageCard
                                        userType={item.userType}
                                        title={item.title}
                                        description={item.description}
                                        btnType={item.btnType}
                                        route={item.route}
                                    />

                                </Grid.Column>
                            );
                        })}
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(Mypage);
