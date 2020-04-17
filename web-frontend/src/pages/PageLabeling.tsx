import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import './PageLabeling.css';

// Components
import ProgressBar from '../components/ProgressBar';

// for mobx
import LabelingPageStore from '../stores/LabelingPageStore';
import {inject, observer} from 'mobx-react';

interface Props {
  labelingPageStore?: LabelingPageStore,
}

@inject('labelingPageStore')
@observer
class PageLabeling extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.props.labelingPageStore!.getAuthor();
    this.props.labelingPageStore!.getThumbnailURL();
    this.props.labelingPageStore!.getDetailDescroption();
    this.props.labelingPageStore!.getStartDate();
    this.props.labelingPageStore!.getEndDate();
    this.props.labelingPageStore!.getLabelingSubject();
    this.props.labelingPageStore!.getOneLineDescription();
    this.props.labelingPageStore!.getProgress();
    this.props.labelingPageStore!.getProgressRate();
    this.props.labelingPageStore!.getTotalProgress();
    this.props.labelingPageStore!.getRewardPoints();
  }
  render() {
    return (
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
              <br/>
              <Grid.Row>
                {/* TODO : have to make labeling types */}
                <h3>라벨링 유형</h3>
                이미지 선택 / 이미지 캡쳐 / 텍스트 선택 / 텍스트 단답형
              </Grid.Row>
              <br/>
              <Grid.Row>
                {/* TODO : have to make date type */}
                <h3>기간</h3>
                {/*{this.props.labelingPageStore?.startDate} - {this.props.labelingPageStore?.endDate}*/}
              </Grid.Row>
              <br/>
              <Grid.Row>
                <h3>한 줄 설명</h3>
                {this.props.labelingPageStore?.oneLineDescription}
              </Grid.Row>
              <br/>
              <Grid.Row>
                <h3>보상 금액</h3>
                {this.props.labelingPageStore?.rewardPoints}P
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{lineHeight: '25px', textAlign: 'justify'}}>
            <h3 style={{marginBottom: '10px'}}>상세 설명</h3>
            {this.props.labelingPageStore?.detailDescription}
          </Grid.Row>
          <Grid.Row>
            {/* TODO : have to fix bug. Now progressbar ui does not appear */}
            <ProgressBar
              progress={this.props.labelingPageStore?.progress}
              all={this.props.labelingPageStore?.totalProgress}
              progress_rate={this.props.labelingPageStore?.progressRate}
              size={"medium"}
            />
            {/*  TODO : have to make start button */}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default PageLabeling;
