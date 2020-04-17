import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Image, Container, Button} from 'semantic-ui-react';

// for Mobx
import {observer, inject} from "mobx-react";

import ImagePicker from "../components/image_picker";

interface Props extends RouteComponentProps<any> {
    navigate?: any
    type?: string;
}

interface State {
    image: any;
    images: any[];
}

interface MatchParams {
    postId: string;
}

const img1 = "https://www.topstarnews.net/news/photo/202001/721626_434936_4849.jpg";

const imageList = [img1, img1, img1, img1, img1, img1, img1, img1, img1];

class Mypage extends React.Component<Props, State, RouteComponentProps<MatchParams>> {

    constructor(props: any) {
        super(props);
        this.state = {
            image: null,
            images: []
        }
    }

    onPickImage = (image: any) => {
        this.setState({image})
    }
    onPickImages = (images: any) => {
        this.setState({images});
    }

    render() {
        return (
            <Container style={{marginTop: 50}}>
                <Header as='h2'>라벨링 주제명</Header>
                <Header as='h4'>#1. 남자를 선택하시오.</Header>
                <Grid>
                    <Grid.Row columns={3}>
                        <ImagePicker
                            images={imageList.map((image, i) => ({src: image, value: i}))}
                            onPick={this.onPickImages.bind(this)}
                            multiple
                        />
                    </Grid.Row>
                </Grid>
                {console.log(this.state.images)}
            </Container>
        );
    }
}

export default withRouter(Mypage);
