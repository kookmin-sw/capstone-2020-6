import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container, Grid} from 'semantic-ui-react';
import './PageLabelingTextSelectByImage.css';

// Components
import LabelingTextButton from '../components/LabelingTextButton';
import LabelingNextBtn from '../components/LabelingNextBtn';
import LabelingFinishButton from '../components/LabelingFinishButton';

// for Mobx
import {inject, observer} from 'mobx-react';
// TODO: LabelingTextSelectByImageStore 로 변경하기
import LabelingTextSelectByImageStore from '../stores/LabelingTextSelectByImageStore';

interface Props {
    labelingTextSelectByImageStore?: LabelingTextSelectByImageStore,
}

interface MatchParams {
    postId: string;
    dataId: string;
}

// TODO: labelingTextSelectByImageStore 로 변경하기
@inject('labelingTextSelectByImageStore') @observer
class PageLabelingTextSelectByImage extends React.Component<Props & RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    let idx = parseInt(this.props.match.params.postId);

    // TODO: labelingTextSelectByImageStore 로 변경하기
    this.props.labelingTextSelectByImageStore?.setIdx(idx);
    this.props.labelingTextSelectByImageStore?.getRequest();
    this.props.labelingTextSelectByImageStore?.getKeywords();
    this.props.labelingTextSelectByImageStore?.getItem();
  }

    handleLink = (e: any) => {
        // TODO: labelingTextSelectByImageStore 로 변경하기
        if (this.props.labelingTextSelectByImageStore?.activeButton == -1) {
          alert('선택해주세요.');
          return;
        }
        // TODO: labelingTextSelectByImageStore 로 변경하기
        this.props.labelingTextSelectByImageStore?.submitLabel(() => {
          this.props.labelingTextSelectByImageStore?.resetActiveButton();
          this.props.labelingTextSelectByImageStore?.getItem();
        });
    }

    render() {
      return (
        <Container className='container'>
          <div style={{width: 600, margin: '100px auto'}}>
            <div className='labelingTitle'>
              {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
              <h2>{this.props.labelingTextSelectByImageStore?.labelingSubject}</h2>
            </div>
            <Grid columns={1}>
              <Grid.Column className='imageContent'>
                {/* TODO: Image src 변경하기 */}
                <img src={this.props.labelingTextSelectByImageStore?.data} style={{maxHeight: 300}}/>
              </Grid.Column>
              <Grid.Column className='imageSelectGrid'>
                <div className='subTitle' style={{fontWeight: 'bold'}}>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  {this.props.labelingTextSelectByImageStore?.labelingText}
                </div>
                <LabelingTextButton
                  category={
                      // TODO: labelingTextSelectByImageStore 로 변경하기
                      this.props.labelingTextSelectByImageStore!.buttonList
                  }
                  value={
                      // TODO: labelingTextSelectByImageStore 로 변경하기
                      this.props.labelingTextSelectByImageStore?.activeButton
                  }
                  // TODO: labelingTextSelectByImageStore 로 변경하기
                  onClick={this.props.labelingTextSelectByImageStore?.setActiveButton}
                />
                <div className='finishButtonLocation'>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  {this.props.labelingTextSelectByImageStore?.leftItems ?
                  <LabelingNextBtn handleLink={this.handleLink}/> :
                  <LabelingFinishButton/>
                  }
                </div>
                <div style={{textAlign: 'right', color: '#777'}}>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  남은 라벨링: {this.props.labelingTextSelectByImageStore?.leftItems}
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      );
    }
}

export default withRouter(PageLabelingTextSelectByImage);
