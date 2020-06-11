import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { History, LocationState } from 'history';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import './PageLabeling.css';

// Components
import Datetime from '../components/DateTime';
import Loading from "../components/Loading";


// for mobx
import LabelingPageStore from '../stores/LabelingPageStore';
import UserStore from '../stores/UserStore';
import { inject, observer } from 'mobx-react';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

interface Props {
  labelingPageStore?: LabelingPageStore,
  userStore?: UserStore,
  someOfYourOwnProps: any;
  history: History<LocationState>;
  someMorePropsIfNeedIt: any;
  match: any;
}

@inject('labelingPageStore', 'userStore')
@observer
class PageLabeling extends React.Component<Props, RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.props.userStore?.getMyInfo()
    this.props.labelingPageStore!.getRequest(parseInt(props.match.params.postId));
  }

  setting = () => {
    this.props.history.push(this.props.match.url + '/requesterResult');
  }

  // TODO: dataId, postId index 시작 통일하기 0 or 1.
  handleLink = (e: any) => {
    console.log(this.props.match)
    const { labelingTypeValue } = this.props.labelingPageStore?.request;
    client.mutate({
      mutation: gql`
          mutation ($token: String!, $requestIdx: Int!) {
            takeProject(token: $token, requestIdx: $requestIdx) {
              message {
                status
                message
              }
              idx
            }
          }
        `,
      variables: {
        token: localStorage.token,
        requestIdx: this.props.match.params.postId
      }
    })
    .then(({data}:any) => {
      alert(data.takeProject.message.message)
      if(!data.takeProject.message.status) {
        if(data.takeProject.message.message === "이미 등록하신 프로젝트입니다.") {
          alert("의뢰를 계속해서 진행합니다.")
          this.props.history.push(`${this.props.match.url}/${labelingTypeValue}/0`);      
        }
        return
      }
      this.props.history.push(`${this.props.match.url}/${labelingTypeValue}/0`);      
    })
    .catch((e:any)=> {
      alert("로그인 후 사용 가능합니다.");
      this.props.history.push('/');
    })
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
                datetime={this.props.labelingPageStore?.request.startDate} />
                &nbsp;-&nbsp;
                <Datetime
                datetime={this.props.labelingPageStore?.request.endDate} />
            </div>
            <div className="project-progress">
              <div style={{ width: `${this.props.labelingPageStore?.request.progressRate}%` }} />
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
                  }} />
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
                  <Datetime datetime={this.props.labelingPageStore?.request.startDate} />
                    &nbsp;-&nbsp;
                    <Datetime datetime={this.props.labelingPageStore?.request.endDate} />
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
            <Grid.Row style={{ justifyContent: 'flex-end' }}>
              <Button color={'blue'} onClick={this.handleLink}>
                시작하기
              </Button>
              {
                (this.props.labelingPageStore?.request.author === this.props.userStore?.username) ? (
                  <Button color={'red'} onClick={this.setting}>
                    설정
                  </Button>
                ) : <></>
              }
            </Grid.Row>
          </Grid>
        <Loading load={this.props.labelingPageStore?.loading}/>
        </Container>
      </>
    );
  }
}

// @ts-ignore
export default withRouter(PageLabeling);
