import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container} from 'semantic-ui-react';
import './PageMyPage.css'

// Components
import MypageCard from "../components/MypageCard";

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

    render() {
        console.log(this.props.myPageListStore!.list);
        return (
            <div className="page">
                <Container>
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
