import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {History, LocationState} from 'history';
import {Button, Container, Grid, Header} from 'semantic-ui-react';
import './PageLabeling.css';

// Components
import Datetime from '../components/DateTime';

// for mobx
import LabelingPageStore from '../stores/LabelingPageStore';
import {inject, observer} from 'mobx-react';

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
    this.props.labelingPageStore!.getRequest(parseInt(props.match.params.postId));
  }

    // TODO: dataId, postId index 시작 통일하기 0 or 1.
    handleLink = (e: any) => {
      let labelingType;
      switch (this.props.labelingPageStore?.request.labelingType) {
        case '[TEXT] 객관식':
          labelingType = 0;
          break;
        case '[TEXT] 단답식':
          labelingType = 1;
          break;
        case '[IMAGE] 객관식':
          labelingType = 2;
          break;
        case '[IMAGE] 영역지정':
          labelingType = 3;
          break;
      }
      this.props.history.push(`${this.props.match.url}/${labelingType}/0`);
    }
    render() {
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
                &nbsp;/&nbsp;
                <Datetime
                  datetime={this.props.labelingPageStore?.request.startDate}/>
                &nbsp;-&nbsp;
                <Datetime
                  datetime={this.props.labelingPageStore?.request.endDate}/>
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
                  {/* TODO: Set image location to center. */}
                  <div className='labelingMainThumbnail'
                    style={{
                      backgroundImage: `url(${this.props.labelingPageStore?.request.thumbnailURL})`,
                    }}/>
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
                    <Datetime datetime={this.props.labelingPageStore?.request.startDate}/>
                    &nbsp;-&nbsp;
                    <Datetime datetime={this.props.labelingPageStore?.request.endDate}/>
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
              <Grid.Row>
                <Header as={'h3'}>상세 설명</Header>
              </Grid.Row>
              <Grid.Row className='detailDescriptionBox'>
                {this.props.labelingPageStore?.request.detailDescription}
              </Grid.Row>
              <Grid.Row style={{justifyContent: 'flex-end'}}>
                <Button color={'blue'} onClick={this.handleLink}>
                  시작하기
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
