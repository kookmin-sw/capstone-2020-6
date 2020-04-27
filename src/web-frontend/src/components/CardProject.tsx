import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {Card, Image, Icon} from 'semantic-ui-react';
import './CardProject.css';
import ProgressBar from './ProgressBar';
import Confirm from '../components/TSANConfirm';

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
}

function calcAgo(timestamp:number) {
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
  return ago;
}

class CardProject extends React.Component<Props> {

  constructor(props:Props) {
    super(props);
    this.handleLink = this.handleLink.bind(this);
  }

  state = {open: false}
  show = () => this.setState({open: true})

  handleConfirm = () => this.setState({open: false})
  handleCancel = () => this.setState({open: false})

  handleLink = (status: string) => {
    if(status !== 'client')
      this.props.history.push(`/labeling/${this.props.id}`);
  }

  render() {
    const {open} = this.state;

    console.log(this.props.navigate);
    return (
      <div className="card_project">
        <Card className="card_image" onClick={()=>this.handleLink(this.props.status)}>
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
            {this.props.status === 'client' &&
                <>
                  <div onClick={this.show}>
                    <Icon name="trash alternate"/>
                  </div>
                  {/*TODO: 의뢰자 라벨링 수정 페이지 경로 설*/}
                  <Link to={`/labeling/${this.props.id}/`}>
                  <Icon name="pencil"/>정
                  </Link>
                  <Confirm
                      header={'안내'}
                      contents={['프로젝트를 정말로 삭제하시겠습니까?']}
                      open={open}
                      handleConfirm={this.handleConfirm}
                      handleCancel={this.handleCancel}
                  />
                </>
            }
            <Card.Description className="card_description">{this.props.description}</Card.Description>
            <ProgressBar
              progress={this.props.progress}
              all={this.props.all}
              progress_rate={this.props.progress_rate}
              size={"small"}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default withRouter(CardProject);
