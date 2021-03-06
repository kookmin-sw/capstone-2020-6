import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Card, Image} from 'semantic-ui-react';
import './CardProject.css';
import ProgressBar from './ProgressBar';

interface Props extends RouteComponentProps<any> {
  navigate?: any;
  id?: string,
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
  status: string;
  reward_state: boolean;
}

function calcAgo(end: string) {

  let today = new Date();

  let y1 = today.getFullYear();
  let m1 = today.getMonth() + 1;
  let d1 = today.getDate();

  let y2 = parseInt(end.slice(0,4));
  let m2 = parseInt(end.slice(5,7));
  let d2 = parseInt(end.slice(8,10));

  let _start = new Date(y1, m1, d1) as any;
  let _end = new Date(y2, m2, d2) as any;

  if(_start > _end) return '';

  let timestamp = _end - _start;

  let ago = '';
  timestamp /= 1000;
  const min = Math.floor(timestamp / 60) % 60;
  const hour= Math.floor(timestamp / 60 / 60) % 24;
  const date= Math.floor(timestamp / 60 / 60 / 24) % 365;
  const month= Math.floor(timestamp / 60 / 60 / 24 / 365);
  const year= Math.floor(timestamp / 60 / 60 / 24 / 365);
  ago += parseInt(''+year) ? year + '년 ' : '';
  ago += parseInt(''+month) ? month + '개월 ' : '';
  ago += parseInt(''+date) ? date + '일 ' : '';
  ago += parseInt(''+hour) ? hour + '시간 ' : '';
  ago += parseInt(''+min) ? min + '분 ' : '';

  return ago + '뒤 ';
}

class CardProject extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  handleLink = (status: string) => {
    if (status !== 'client') {
      this.props.history.push(`/labeling/${this.props.id}`);
    }
    window.scroll(0, 0);
  }

  render() {
    return (
      <div className="card_project">
        <Card className="card_image"
          onClick={()=>this.handleLink(this.props.status)}>
          <Image src={this.props.thumbnail}
            wrapped ui={false}
            onError={(i: any) => i.target.src='/images/NoImg.jpeg'}/>
          <Card.Content className="card_content">
            <Card.Header className="card_project_title">
              [{this.props.type}] {this.props.title}
            </Card.Header>
            <Card.Meta className="card_meta">
              {this.props.author}
              &nbsp;|&nbsp;
              {this.props.point}P
              |&nbsp;
              {calcAgo(this.props.end_date)}종료
              {this.props.reward_state === true && ` | 보상완료`}
            </Card.Meta>
            <Card.Description className="card_description">{this.props.description!.length < 40 ? this.props.description : this.props.description?.slice(0, 38) + '...'}</Card.Description>
            <ProgressBar
              progress={this.props.progress}
              all={this.props.all}
              progress_rate={this.props.progress_rate}
              size={'small'}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(CardProject);
