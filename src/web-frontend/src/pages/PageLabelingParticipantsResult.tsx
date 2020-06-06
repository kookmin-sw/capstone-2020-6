import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Header, Table} from 'semantic-ui-react';
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
    this.props.labelingResultStore?.getAnswerLabeler(parseInt(this.props.match.params.postId));
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
        </div>
        <br/>
        <div>
          <Container>
            <Header as={'h3'}># Labeling 결과 분석</Header>
            <Table celled>
              <Table.Header>
                <Table.HeaderCell textAlign="center">#</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">데이터 이름</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">입력 레이블</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">정답 레이블</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">정답 여부</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {
                  this.props.labelingResultStore?.answers.map((answer:any, idx:number) => {
                    console.log(answer)
                    return (
                      <Table.Row negative={!answer.is_answer} positive={answer.is_answer}>
                        <Table.Cell textAlign="center">{idx}</Table.Cell>
                        <Table.Cell>{answer.data || "데이터 없음"}</Table.Cell>
                        <Table.Cell>{answer.label || "데이터 없음"}</Table.Cell>
                        <Table.Cell>{answer.answer || "데이터 없음"}</Table.Cell>
                        <Table.Cell textAlign="center">{answer.is_answer ? "O" : "X"}</Table.Cell>
                      </Table.Row>
                    )
                  })
                }
              </Table.Body>
            </Table>
            {/* TODO: Implement table body. */}
            {/* TODO: Check footer. */}
            {/* <ProjectListTable header={this.header} body={null}/> */}
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(PageLabelingParticipantsResult);
