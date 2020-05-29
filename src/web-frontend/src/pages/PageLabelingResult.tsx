import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, Header, Grid, Table } from 'semantic-ui-react';
import Datetime from '../components/DateTime';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie
} from 'recharts';

import './PageLabelingResult.css';
import LabelingResultStore from '../stores/LabelingResultStore';
import LabelingPageStore from '../stores/LabelingPageStore';
import { inject, observer } from "mobx-react";
import ProjectListTable from "../components/ProjectListTable";

interface Props {
  labelingPageStore?: LabelingPageStore;
  labelingResultStore?: LabelingResultStore;
  match: any;
  history: any;
  location: any;
}

@inject('labelingResultStore', 'labelingPageStore')
@observer
class PageLabelingResult extends React.Component<Props, RouteComponentProps> {

  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor(props: Props) {
    super(props);
    this.props.labelingResultStore!.getLevelData();
    this.props.labelingResultStore!.getLabelingResult();
  }
  componentDidMount() {
    this.props.labelingPageStore!.getRequest(parseInt(this.props.match.params.postId));
  }
  header = [
    { id: 1, headerItem: '종류' },
    { id: 2, headerItem: '결과' },
  ]
  download() {

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
        <Container className={"result_cont"}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as={'h3'}># Labeling 결과 분석</Header>
                <PieChart width={400} height={400}>
                  <Pie dataKey="value" isAnimationActive={false} data={this.props.labelingResultStore?.labelingResult} cx={200} cy={200} outerRadius={160} fill="#4B81B4" label />
                  <Tooltip />
                </PieChart>
              </Grid.Column>
              <Grid.Column>
                <Header as={'h3'}># 프로젝트 참여자 신뢰도 분석</Header>
                <div className={'result_line'}>
                  <LineChart
                    width={500}
                    height={300}
                    data={this.props.labelingResultStore?.levelData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="All_user" stroke="#1D3B98" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Project_user" stroke="#98301D" />
                  </LineChart>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as={'h4'}>의뢰하신 레이블링된 결과는 다음과 같습니다.</Header>
                <ProjectListTable header={this.header} body={this.props.labelingResultStore?.labelingResult.map((item: any, idx: number) => {
                  return (
                    <>
                      <Table.Row key={idx}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.value}</Table.Cell>
                      </Table.Row>
                    </>
                  )
                })} />
              </Grid.Column>
              <Grid.Column className={'result_level'}>
                <em style={{ color: "#1D3B98" }}><b>푸른 선</b></em>은 T-SAN의 <b>모든 레이블링 참여자</b>의 신뢰도 분포도입니다.<br />
                <em style={{ color: "#98301D" }}><b>붉은 선</b></em>은 <b>이 프로젝트에 참여한 레이블링 참여자</b>의 신뢰도 분포도입니다. <br />
                <Header as={'h3'}>이 프로젝트는 에베레스트 등급의 참여자가 많이 참여하였습니다.</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div style={{marginTop: 30, padding: 20, backgroundColor: "#f2f2f2"}}>
            현재까지 완료된 데이터셋 <a href={"http://localhost:8000/download/" + this.props.match?.params.postId}>다운로드</a>
          </div>
        </Container>
      </>
    );
  }
}

export default withRouter(PageLabelingResult);