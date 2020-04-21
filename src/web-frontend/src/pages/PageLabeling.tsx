import React from 'react';
import {Button, Container, Grid} from 'semantic-ui-react';
import './PageLabeling.css';
// for mobx
import LabelingPageStore from '../stores/LabelingPageStore';
import {inject, observer} from 'mobx-react';
import { withRouter, RouteComponentProps} from "react-router";
import { History, LocationState } from "history";

interface Props {
    labelingPageStore?: LabelingPageStore,
    someOfYourOwnProps: any;
    history: History<LocationState>;
    someMorePropsIfNeedIt: any;
    match: any;
}

@inject('labelingPageStore')
@observer
class PageLabeling extends React.Component<Props, RouteComponentProps> {
    constructor(props: any) {
        super(props);
        this.props.labelingPageStore!.getAuthor();
        this.props.labelingPageStore!.getThumbnailURL();
        this.props.labelingPageStore!.getDetailDescroption();
        this.props.labelingPageStore!.getStartDate();
        this.props.labelingPageStore!.getEndDate();
        this.props.labelingPageStore!.getLabelingType();
        this.props.labelingPageStore!.getLabelingSubject();
        this.props.labelingPageStore!.getOneLineDescription();
        this.props.labelingPageStore!.getProgress();
        this.props.labelingPageStore!.getProgressRate();
        this.props.labelingPageStore!.getTotalProgress();
        this.props.labelingPageStore!.getRewardPoints();
    }


    handleLink = (e: any) => {
        if (this.props.labelingPageStore?.labelingType === 'imgSel') {
            this.props.history.push(`${this.props.match.url}/imgsel`);
        }
    }

    render() {
        // console.log(this.props.match.url);
        return (
            <>
                <img
                    src="https://images.squarespace-cdn.com/content/v1/5a4b9a60f14aa1b80ee8b4bf/1526824060626-MOP6Q0GBCFGBZL6X0XAS/ke17ZwdGBToddI8pDm48kG1ZR-Z7vMRbaPSptufERj8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2doJvWtw2DlpnSbrWMhLSNCfSlrVXXzrJqrJxEymxGao2P7cJNZlDXbgJNE9ef52e8w/pangolinSquare_banner_disneyFanatic-wallpapers.jpg?format=1500w"
                    className="project-top-image"
                />
                <div className="project-paper">
                    <Container>
                        <div className="project-title">광고 문자 필터링을 위한 Labeling</div>
                        <div className="project-oneline-desc">{this.props.labelingPageStore?.oneLineDescription}</div>
                        <div className="project-line-info">
                            <div>이미지 유형: {this.props.labelingPageStore?.labelingType}</div>
                            {this.props.labelingPageStore?.author}
                            &nbsp;/&nbsp;
                            {this.props.labelingPageStore?.rewardPoints}P
                            /
                            2020.01.01. 00:00 - 2020.01.02. 23:59
                        </div>
                        <div className="project-progress">
                            <div></div>
                        </div>
                    </Container>
                </div>
                <Container>
                    <Grid>
                        <Grid.Row className='labelingPageTitle'>
                            <h2>{this.props.labelingPageStore?.labelingSubject}</h2>
                        </Grid.Row>
                        <Grid.Row columns={2} className='labelingPageMain'>
                            <Grid.Column className='labelingPageThumbnailBox'>
                                <img alt='thumbnail'
                                     className='labelingPageThumbnail'
                                     src={this.props.labelingPageStore?.thumbnailURL}/>
                            </Grid.Column>
                            <Grid.Column rows={5} className='labelingPageDescription'>
                                <Grid.Row>
                                    <h3>의뢰자</h3>
                                    {this.props.labelingPageStore?.author}
                                </Grid.Row>
                                {/*<br/>*/}
                                <Grid.Row>
                                    {/* TODO : have to make labeling types */}
                                    <h3>라벨링 유형</h3>
                                    {this.props.labelingPageStore?.labelingType}
                                </Grid.Row>
                                {/*<br/>*/}
                                <Grid.Row>
                                    {/* TODO : have to make date type */}
                                    <h3>기간</h3>
                                    2020.01.01 - 2020.05.05
                                    {/*{this.props.labelingPageStore?.startDate} - {this.props.labelingPageStore?.endDate}*/}
                                </Grid.Row>
                                {/*<br/>*/}
                                <Grid.Row>
                                    <h3>한 줄 설명</h3>
                                    {this.props.labelingPageStore?.oneLineDescription}
                                </Grid.Row>
                                {/*<br/>*/}
                                <Grid.Row>
                                    <h3>보상 금액</h3>
                                    {this.props.labelingPageStore?.rewardPoints}P
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='detailDescriptionBox'>
                            <h3>상세 설명</h3>
                            {this.props.labelingPageStore?.detailDescription}
                        </Grid.Row>
                        <Grid.Row style={{justifyContent: 'flex-end'}}>
                            <Button color={'blue'} onClick={this.handleLink}>
                                연습하고 시작하기
                            </Button>
                        </Grid.Row>
                    </Grid>
                </Container>
            </>
        );
    }
}

// @ts-ignore
export default withRouter(PageLabeling);
