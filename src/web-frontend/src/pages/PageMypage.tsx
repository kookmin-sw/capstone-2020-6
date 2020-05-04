import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Grid, Container, Button, Card, Icon} from 'semantic-ui-react';
import './PageMyPage.css'

// for Mobx
import {observer, inject} from 'mobx-react';
import MyPageListStore from '../stores/MyPageListStore';

interface Props extends RouteComponentProps<any> {
    navigate?: any
    myPageListStore?: MyPageListStore;
}

@inject('myPageListStore')
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
        // const { open } = this.state;

        return (

            <div className="page">
                <Container>

                    {/*confirm test*/}
                    {/* <Button
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
                    /> */}
                    {/*end*/}

                    <Grid columns={3}>
                        <Grid.Column width={16}><div className="page-title">마이페이지</div></Grid.Column>
                        <Grid.Column className="_grid">
                            <Card>
                                <Card.Content className="mycard_content">
                                    <div className="mycard_icon"><Icon name="key"/></div>
                                    <Card.Header>
                                        개인정보
                                    </Card.Header>
                                    <Card.Description className="mycard_description">
                                        T-SAN 로그인시 사용하는 비밀번호를 변경할 수 있습니다.
                                        "주기적인 비밀번호 변경을 통해 개인 정보를 안전하게 보호하세요.
                                    </Card.Description>
                                </Card.Content>
                                <Button className="mycard_btn" href="/mypage/pw" color="blue" fluid>
                                    비밀번호 변경
                                </Button>
                            </Card>
                        </Grid.Column>
                        <Grid.Column className="_grid">
                            <Card>
                                <Card.Content className="mycard_content">
                                    <div className="mycard_icon"><Icon name="map"/></div>
                                    <Card.Header>
                                        프로젝트 관리
                                    </Card.Header>
                                    <Card.Description className="mycard_description">
                                        T-SAN 에서 의로한 프로젝트를 한눈에 관리하세요. 완료된 프로젝트의 결과를 확인할 수 있습니다.
                                    </Card.Description>
                                </Card.Content>
                                <Button className="mycard_btn" href="/mypage/projects" color="blue" fluid>
                                    프로젝트 관리
                                </Button>
                            </Card>
                        </Grid.Column>
                        <Grid.Column className="_grid">
                            <Card>
                                <Card.Content className="mycard_content">
                                    <div className="mycard_icon"><Icon name="money"/></div>
                                    <Card.Header>
                                        포인트 관리 
                                    </Card.Header>
                                    <Card.Description className="mycard_description">
                                        T-SAN 에서 사용한 포인트 내역을 확인할 수 있습니다.
                                    </Card.Description>
                                </Card.Content>
                                <Button className="mycard_btn" href="/mypage/points" color="blue" fluid>
                                    포인트 관리
                                </Button>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(Mypage);
