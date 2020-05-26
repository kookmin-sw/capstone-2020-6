import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Button, Container, Grid} from 'semantic-ui-react';
import './PageLabelingTextWrite.css';

// Components
import JInput from '../components/JInput';
import LabelingNextBtn from '../components/LabelingNextBtn';
import LabelingFinishButton from '../components/LabelingFinishButton';

// for Mobx
import {inject, observer} from 'mobx-react';
import LabelingTextWriteStore from '../stores/LabelingTextWriteStore';

interface Props extends RouteComponentProps<any>{
    labelingTextWriteStore?: LabelingTextWriteStore;
}

interface MatchParams {
  postId: string;
  dataId: string;
}

@inject('labelingTextWriteStore')
@observer
class PageLabelingTextWrite extends React.Component<Props & RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
      this.props.labelingTextWriteStore?.getLabelingSubject();
      this.props.labelingTextWriteStore?.getTextLabelingContents();
  }

  handleLink = (e: any) => {
    // TODO: 입력한 내용 API 로 보내기
    var num = parseInt(this.props.match.params.dataId) + 1;
    this.props.history.push(`/labeling/${this.props.match.params.postId}/0/${num}`);
  }

  render() {
    return (
      <Container className='container'>
        <div className='labelingTitle'>
          <h2>{this.props.labelingTextWriteStore?.labelingSubject}</h2>
        </div>
        <Grid columns={2}>
          <Grid.Column className='textLabelingContents'>
            {this.props.labelingTextWriteStore?.
            textLabelingContentList[this.props.match.params.dataId].content}
          </Grid.Column>
          <Grid.Column className='textWriteGrid'>
            <div className='subTitle'>
              {Number(this.props.match.params.dataId) + 1}. 다음 글의 유형을 입력하시오.
            </div>
            <div className='textLabelingAnswerBox'>
              <JInput
                style={{width: '80%'}}
                placeholder='다음 글의 유형을 적어주세요.'
                value={this.props.labelingTextWriteStore?.labelingTextResultInput}
                onChange={this.props.labelingTextWriteStore?.setLabelingTextResultInput}
                type='text'/>
              <Button
                color={'blue'}
                style={{width: '18%'}}>
                입력
              </Button>
            </div>
            <div className='finishButtonLocation'>
              {/* TODO: 버튼 눌렀을 때 입력된 값 저장 + 입력 상태 초기화 해줘야함 */}
              {Number(this.props.match.params.dataId) + 1 !==
              this.props.labelingTextWriteStore?.
              textLabelingContentList.length ?
              <LabelingNextBtn handleLink={this.handleLink}/> :
              <LabelingFinishButton/>}
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextWrite);
