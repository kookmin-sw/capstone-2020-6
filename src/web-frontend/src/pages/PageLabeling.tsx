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
    this.props.labelingPageStore!.getRequest(props.match.params.postId);
  }

    // TODO: dataId, postId index 시작 통일하기 0 or 1.
    handleLink = (e: any) => {
      let labelingType;
      switch (this.props.labelingPageStore?.request.labelingType) {
        case '[TEXT] 객관식':
          labelingType = 'txtsel';
          break;
        case '[TEXT] 단답식':
          labelingType = 'txtwrite';
          break;
        case '[IMAGE] 선택형':
          labelingType = 'imgSel';
          break;
        case '[IMAGE] 캡쳐형':
          labelingType = 'imgCap';
          break;
      }
      this.props.history.push(`${this.props.match.url}/${labelingType}/0`);
    }

    render() {
      console.log(this.props.labelingPageStore?.request);
        return (
            <>
                <img
                    src={this.props.labelingPageStore?.request.thumbnailURL}
                    alt='thumbnail'
                    className="project-top-image"
                />
                <div className="project-paper">
                    <Container>
                        <div className="project-title">{this.props.labelingPageStore?.request.labelingSubject}</div>
                        <div className="project-oneline-desc">{this.props.labelingPageStore?.request.oneLineDescription}</div>
                        <div className="project-line-info">
                            <div>라벨링 유형: {this.props.labelingPageStore?.request.labelingType}</div>
                            {this.props.labelingPageStore?.request.author}
                            &nbsp;/&nbsp;
                            {this.props.labelingPageStore?.request.rewardPoints}P
                            /
                            {this.props.labelingPageStore?.request.start_date} - {this.props.labelingPageStore?.request.end_date}
                        </div>
                        <div className="project-progress">
                            <div style={{width: `${this.props.labelingPageStore?.request.progressRate}%`}}/>
                        </div>
                    </Container>
                </div>
                <Container>
                    <Grid>
                        <Grid.Row className='labelingPageTitle'>
                            <h2>{this.props.labelingPageStore?.request.labelingSubject}</h2>
                        </Grid.Row>
                        <Grid.Row columns={2} className='labelingPageMain'>
                            <Grid.Column className='labelingPageThumbnailBox'>
                                <img alt='thumbnail'
                                     className='labelingPageThumbnail'
                                     src={this.props.labelingPageStore?.request.thumbnailURL}/>
                            </Grid.Column>
                            <Grid.Column rows={5} className='labelingPageDescription'>
                                <Grid.Row>
                                    <h3>의뢰자</h3>
                                    {this.props.labelingPageStore?.request.author}
                                </Grid.Row>
                                <Grid.Row>
                                    <h3>라벨링 유형</h3>
                                    {this.props.labelingPageStore?.request.labelingType}
                                </Grid.Row>
                                <Grid.Row>
                                    {/* TODO : have to make date type */}
                                    <h3>기간</h3>
                                    {this.props.labelingPageStore?.request.start_date} - {this.props.labelingPageStore?.request.end_date}
                                </Grid.Row>
                                <Grid.Row>
                                    <h3>한 줄 설명</h3>
                                    {this.props.labelingPageStore?.request.oneLineDescription}
                                </Grid.Row>
                                <Grid.Row>
                                    <h3>보상 금액</h3>
                                    {this.props.labelingPageStore?.request.rewardPoints}P
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className='detailDescriptionBox'>
                            <h3>상세 설명</h3>
                            <br/>
                            {this.props.labelingPageStore?.request.detailDescription}
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
