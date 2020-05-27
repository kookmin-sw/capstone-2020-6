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
    this.props.labelingTextSelectStore?.getRequest()
    this.props.labelingTextSelectStore?.getKeywords()
    this.props.labelingTextSelectStore?.getItem()
  }

  handleLink = (e: any) => {
    if(this.props.labelingTextSelectStore?.activeButton == -1) {
      alert("선택해주세요.")
      return
    }
    this.props.labelingTextSelectStore?.submitLabel(() => {
      this.props.labelingTextSelectStore?.resetActiveButton()
      this.props.labelingTextSelectStore?.getItem()
    })
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
                {this.props.labelingTextSelectStore?.leftItems ?
                <LabelingNextBtn handleLink={this.handleLink}/> :
                <LabelingFinishButton/>
                }
              </div>
              <div style={{textAlign: "right", color: "#777"}}>
                남은 라벨링: {this.props.labelingTextSelectStore?.leftItems}
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextSelect);
