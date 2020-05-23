import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';
import './PageLabelingTextSelect.css';

// Components
import LabelingTextButton from '../components/LabelingTextButton';
import LabelingNextBtn from '../components/LabelingNextBtn';
import LabelingFinishButton from '../components/LabelingFinishButton';

// for Mobx
import {inject, observer} from 'mobx-react';
import LabelingTextSelectStore from '../stores/LabelingTextSelectStore';

interface Props {
  labelingTextSelectStore?: LabelingTextSelectStore,
}

interface MatchParams {
  postId: string;
  dataId: string;
}

@inject('labelingTextSelectStore') @observer
class PageLabelingTextSelect extends React.Component<Props & RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    this.props.labelingTextSelectStore!.getLabelingSubject();
    this.props.labelingTextSelectStore!.getButtons();
    this.props.labelingTextSelectStore!.getTextLabelingContents();
  }

  handleLink = (e: any) => {
    // TODO: 선택한 버튼 API 로 보내기
    var num = parseInt(this.props.match.params.dataId) + 1;
    this.props.history.push(`/labeling/${this.props.match.params.postId}/txtSel/${num}`);
  }

  render() {
    return (
      <Container className='container'>
        <div className='labelingTitle'>
          <h2>{this.props.labelingTextSelectStore?.labelingSubject}</h2>
        </div>
        <Grid columns={2}>
          <Grid.Column className='textLabelingContents'>
            {this.props.labelingTextSelectStore?.
             textLabelingContentList[this.props.match.params.dataId].content}
          </Grid.Column>
          <Grid.Column className='textSelectGrid'>
            <div className='subTitle'>
              {Number(this.props.match.params.dataId) + 1}. 다음 글의 유형을 선택하시오.
            </div>
            <LabelingTextButton
              category={
                this.props.labelingTextSelectStore!.buttonList
              }
              value={
                this.props.labelingTextSelectStore?.activeButton
              }
              onClick={this.props.labelingTextSelectStore?.setActiveButton}
            />
            <div className='finishButtonLocation'>
              {/* TODO: 버튼 눌렀을 때 선택된 값 저장 + 버튼 눌린 상태 초기화 해줘야함 */}
              {Number(this.props.match.params.dataId) + 1 !==
               this.props.labelingTextSelectStore?.
               textLabelingContentList.length ?
               <LabelingNextBtn handleLink={this.handleLink}/> :
               <LabelingFinishButton/>
              }
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextSelect);
