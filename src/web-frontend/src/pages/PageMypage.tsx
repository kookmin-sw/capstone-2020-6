import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container, Button} from 'semantic-ui-react';
import './PageMyPage.css'

// Components
import MypageCard from "../components/MypageCard";
import Popup from "../components/Popup";
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
    // Popup test
    state = {open: false};
    handleClose = () => this.setState({open: false});
    handleOpen = () => this.setState({open: true});
    // TODO: 나중에 프로젝트 삭제 등 기능 추가 구현
    handleCorrect = () => this.setState({open: true});

    contents = ['* 한 번 취소된 프로젝트는 다시 복구할 수 없습니다.',
        '* 프로젝트 취소로 인한 수수료는 의뢰자가 부담합니다.',
    '* 정말로 취소하시겠습니까?'];

    render() {
        console.log(this.props.myPageListStore!.list);
        // Popup test
        const {open} = this.state;

        return (

            <div className="page">
                <Container>

                    {/*Popup test*/}
                    <Button
                        content='Popup test'
                        disabled={open}
                        positive
                        onClick={this.handleOpen}
                    />
                    <Popup
                        header={'경고'}
                        contents={this.contents}
                        open={open}
                        handleClose={this.handleClose}
                        handleCorrect={this.handleCorrect}
                    />

                    {/*real*/}
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
