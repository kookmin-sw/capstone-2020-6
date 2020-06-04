import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Header} from 'semantic-ui-react';
import Datetime from '../components/DateTime';

import './PageLabelingParticipantsResult.css';
import LabelingResultStore from '../stores/LabelingResultStore';
import LabelingPageStore from '../stores/LabelingPageStore';
import MyPageProjectStore from '../stores/MyPageProjectStore';
import { inject, observer } from "mobx-react";
import ProjectListTable from "../components/ProjectListTable";

interface Props {
  labelingPageStore?: LabelingPageStore;
  labelingResultStore?: LabelingResultStore;
  myPageProjectStore?: MyPageProjectStore;
  match: any;
  history: any;
  location: any;
}

@inject('labelingResultStore', 'labelingPageStore', 'myPageProjectStore')
@observer
class PageLabelingParticipantsResult extends React.Component<Props, RouteComponentProps> {

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor(props: Props) {
    super(props);
    this.props.myPageProjectStore!.getProjects();
    this.props.labelingResultStore!.getLevelData();
    this.props.labelingResultStore!.getLabelingResult();
  }
  componentDidMount() {
    this.props.labelingPageStore!.getRequest(parseInt(this.props.match.params.postId));
  }
  header = [
    { id: 1, headerItem: '번호' },
    { id: 2, headerItem: '문항' },
    { id: 3, headerItem: '내가 선택한 답' },
    { id: 4, headerItem: '정답' },
  ]
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
          <br/>
          <Container className={"result_cont"}>
            <Header as={'h3'}># Labeling 결과 분석</Header>
            {/* TODO: Implement table body. */}
            {/* TODO: Check footer. */}
            <ProjectListTable header={this.header} body={null}/>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(PageLabelingParticipantsResult);
