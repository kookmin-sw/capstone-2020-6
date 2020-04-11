import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Image, Container, Button} from 'semantic-ui-react';

// for Mobx
import {observer, inject} from "mobx-react";
import MyPageListStore from "../stores/MyPageListStore";

import './PageImgLabeling.css';

interface Props extends RouteComponentProps<any> {
    navigate?: any
    myPageListStore?: MyPageListStore;
    type?: string;
}

interface MatchParams {
    postId: string;
}

@inject("myPageListStore")
@observer
class Mypage extends React.Component<Props, RouteComponentProps<MatchParams>> {

    constructor(props: any) {
        super(props);
        this.props.myPageListStore!.getAvailableMyPageList();
    }

    render() {
        return (
            // img selection = imgSel, img capture = imgCap
            // {this.props.match.params.postId}
            <div>

                <Container className="img_container">
                    <Grid columns={3}>
                        <Grid.Row className="img_row">
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="img_row">
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className="img_row">
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                            <Grid.Column className="img_col">
                                <Image className="img_size" src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" size={"small"}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default withRouter(Mypage);
