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
import LabelingTextSelectStore from '../stores/LabelingTextSelectStore';

interface Props {
    labelingTextSelectStore?: LabelingTextSelectStore,
}

interface MatchParams {
    postId: string;
    dataId: string;
}

// TODO: labelingTextSelectByImageStore 로 변경하기
@inject('labelingTextSelectStore') @observer
class PageLabelingTextSelectByImage extends React.Component<Props & RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    let idx = parseInt(this.props.match.params.postId);

    // TODO: labelingTextSelectByImageStore 로 변경하기
    this.props.labelingTextSelectStore?.setIdx(idx);
    this.props.labelingTextSelectStore?.getRequest();
    this.props.labelingTextSelectStore?.getKeywords();
    this.props.labelingTextSelectStore?.getItem();
  }

    handleLink = (e: any) => {
        // TODO: labelingTextSelectByImageStore 로 변경하기
        if (this.props.labelingTextSelectStore?.activeButton == -1) {
        alert('선택해주세요.');
        return;
      }
        // TODO: labelingTextSelectByImageStore 로 변경하기
        this.props.labelingTextSelectStore?.submitLabel(() => {
        this.props.labelingTextSelectStore?.resetActiveButton();
        this.props.labelingTextSelectStore?.getItem();
      });
    }

    render() {
      return (
        <Container className='container'>
          <div style={{width: 600, margin: '100px auto'}}>
            <div className='labelingTitle'>
              {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
              <h2>{this.props.labelingTextSelectStore?.labelingSubject}</h2>
            </div>
            <Grid columns={1}>
              <Grid.Column className='imageContent'>
                {/* TODO: Image src 변경하기 */}
                <img src='https://i.pinimg.com/564x/e7/d2/ab/e7d2ab0cf45c40522b88c8f2dec0ed3d.jpg'/>
              </Grid.Column>
              <Grid.Column className='imageSelectGrid'>
                <div className='subTitle' style={{fontWeight: 'bold'}}>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  {this.props.labelingTextSelectStore?.labelingText}
                </div>
                <LabelingTextButton
                  category={
                      // TODO: labelingTextSelectByImageStore 로 변경하기
                      this.props.labelingTextSelectStore!.buttonList
                  }
                  value={
                      // TODO: labelingTextSelectByImageStore 로 변경하기
                      this.props.labelingTextSelectStore?.activeButton
                  }
                  // TODO: labelingTextSelectByImageStore 로 변경하기
                  onClick={this.props.labelingTextSelectStore?.setActiveButton}
                />
                <div className='finishButtonLocation'>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  {this.props.labelingTextSelectStore?.leftItems ?
                  <LabelingNextBtn handleLink={this.handleLink}/> :
                  <LabelingFinishButton/>
                  }
                </div>
                <div style={{textAlign: 'right', color: '#777'}}>
                  {/* TODO: labelingTextSelectByImageStore 로 변경하기 */}
                  남은 라벨링: {this.props.labelingTextSelectStore?.leftItems}
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      );
    }
}

export default withRouter(PageLabelingTextSelectByImage);
