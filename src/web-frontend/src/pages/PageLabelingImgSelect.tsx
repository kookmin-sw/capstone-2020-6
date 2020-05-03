import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container} from 'semantic-ui-react';
import ImagePicker from "../components/image_picker";

// for Mobx
import {observer, inject} from "mobx-react";
import LabelingImgStore from '../stores/LabelingImgStore';

interface Props extends RouteComponentProps<any> {
    navigate?: any
    type?: string;
}

interface Props {
    labelingImgStore?: LabelingImgStore;
}

interface State {
    image: any;
    images: any[];
}

interface MatchParams {
    postId: string;
}

@inject('labelingImgStore')
@observer

class PageLabelingImgSel extends React.Component<Props, State, RouteComponentProps<MatchParams>> {

    constructor(props: any) {
        super(props);
        this.props.labelingImgStore!.getImgList();
        this.props.labelingImgStore!.setSelectList([]);
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
        this.props.labelingImgStore!.setSelectList(this.state.images)
    }

    render() {
        return (
            <Container style={{marginTop: 50}}>
                <Header as='h2'>강아지 이미지 데이터를 통한 이미지 학습 모델 구현</Header>
                <Header as='h4'>#1. 강아지를 선택하시오.</Header>
                <Grid>
                    <Grid.Row columns={3}>
                        <ImagePicker
                            images={this.props.labelingImgStore!.imgList.map((image, i) => ({src: image, value: i}))}
                            onPick={this.onPickImages.bind(this)}
                            multiple
                        />
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(PageLabelingImgSel);
