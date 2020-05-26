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
    let idx = parseInt(this.props.match.params.postId)
    this.props.labelingTextSelectStore?.setIdx(idx)
    this.props.labelingTextSelectStore?.getRequest();
    this.props.labelingTextSelectStore?.getItem()
    // this.props.labelingTextSelectStore!.getButtons();
    // this.props.labelingTextSelectStore!.getTextLabelingContents();
  }

  handleLink = (e: any) => {
    // TODO: 선택한 버튼 API 로 보내기
    this.props.labelingTextSelectStore?.resetActiveButton();
    var num = parseInt(this.props.match.params.dataId) + 1;
    this.props.history.push(`/labeling/${this.props.match.params.postId}/1/${num}`);
  }

  render() {
    return (
      <Container className='container'>
        <div style={{width: 600, margin: '100px auto'}}>
          <div className='labelingTitle'>
            <h2>{this.props.labelingTextSelectStore?.labelingSubject}</h2>
          </div>
          <Grid columns={1}>
            <Grid.Column className='textLabelingContents'>
              {this.props.labelingTextSelectStore?.data}
            </Grid.Column>
            <Grid.Column className='textSelectGrid'>
              <div className='subTitle' style={{fontWeight: "bold"}}>
                {this.props.labelingTextSelectStore?.labelingText}
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
                {this.props.labelingTextSelectStore?.leftItems == 0 ?
                <LabelingNextBtn handleLink={this.handleLink}/> :
                <LabelingFinishButton/>
                }
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextSelect);
