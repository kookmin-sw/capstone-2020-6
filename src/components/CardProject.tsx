import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Card, Container, Grid, Icon, Image } from "semantic-ui-react";
import "./CardProject.css";
import ProgressBar from "./ProgressBar";

interface Props extends RouteComponentProps<any> {
  navigate?: any;
  title?: string;
  thumbnail?: string;
  author?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  point?: string;
  description?: string;
  progress?: string;
  all?: string;
  progress_rate?: string;
}

class CardProject extends React.Component<Props> {
  render() {
    console.log(this.props.navigate);
    return (
      <div className="card_project">
        <Card>
          <Image src={this.props.thumbnail} wrapped ui={false} />
          <Card.Content>
            <Card.Header>
              [{this.props.type}] {this.props.title}
            </Card.Header>
            <Icon name="bitcoin" />
            {this.props.point}
            <Card.Meta>{this.props.author}</Card.Meta>
            {this.props.start_date + "-" + this.props.end_date}
            <Card.Description>{this.props.description}</Card.Description>
            <ProgressBar
              progress={this.props.progress}
              all={this.props.all}
              progress_rate={this.props.progress_rate}
            />
          </Card.Content>
          {/*<Card.Content extra>*/}
          {/*</Card.Content>*/}
        </Card>

        {/*<img*/}
        {/*src={this.props.thumbnail}*/}
        {/*/>*/}
        {/*<div className="card_description">*/}
        {/*    <div>{this.props.title}</div>*/}
        {/*    <div>1사이클 완료시 보상: asdasd</div>*/}
        {/*    <div>참여 현황 (진행율, 프로그래스바)</div>*/}
        {/*    <div>마감날짜 (진행율, 프로그래스바)</div>*/}
        {/*    <div>썸네일 이미지</div>*/}
        {/*    <div>주최자(의뢰자)</div>*/}
        {/*    <div>몇개를 라벨링 해야하는가? (N개)</div>*/}
        {/*    <div>라벨링 유형 (이미지/텍스트 + 객관식, 주관식, 영역 선택)</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}

export default withRouter(CardProject);
