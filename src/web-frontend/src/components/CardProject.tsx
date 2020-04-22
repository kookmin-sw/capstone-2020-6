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
  start_date?: any;
  end_date?: any;
  type?: string;
  point?: string;
  description?: string;
  progress?: string;
  all?: string;
  progress_rate?: string;
}

function calcAgo(timestamp:number) {
  let ago = ""
  timestamp /= 1000
  const sec = timestamp % 60
  const min = Math.floor(timestamp / 60) % 60
  const hour= Math.floor(timestamp / 60 / 60) % 24
  const date= Math.floor(timestamp / 60 / 60 / 24) % 365
  const month= Math.floor(timestamp / 60 / 60 / 24 / 365)
  const year= Math.floor(timestamp / 60 / 60 / 24 / 365)
  ago += parseInt(''+year) ? year + "년 " : ""
  ago += parseInt(''+month) ? month + "개월 " : ""
  ago += parseInt(''+date) ? date + "일 " : ""
  ago += parseInt(''+hour) ? hour + "시간 " : ""
  ago += parseInt(''+min) ? min + "분 " : ""
  ago += parseInt(''+sec) ? sec + "초 " : ""
  return ago
}

class CardProject extends React.Component<Props> {
  render() {
    console.log(this.props.navigate);
    return (
      <div className="card_project">
        <Card className="card_image">
          <Image src={this.props.thumbnail} wrapped ui={false}/>
          <Card.Content className="card_content">
            <Card.Header className="card_project_title">
              [{this.props.type}] {this.props.title}
            </Card.Header>
            <Card.Meta>
              {this.props.author}
              &nbsp;|&nbsp;
              {this.props.point}P
              &nbsp;|&nbsp;
              {calcAgo(this.props.end_date - this.props.start_date).trim()} 뒤 종료
            </Card.Meta>
            <Card.Description className="card_description">{this.props.description}</Card.Description>
            <ProgressBar
              progress={this.props.progress}
              all={this.props.all}
              progress_rate={this.props.progress_rate}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(CardProject);
