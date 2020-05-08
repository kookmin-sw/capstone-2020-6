import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Header, Grid, Container} from 'semantic-ui-react';
import './PageLabelingImgSelect.css';

// Components
import ImagePicker from '../components/image_picker';
import LabelingNextBtn from '../components/LabelingNextBtn';
import LabelingFinishButton from '../components/LabelingFinishButton';

// for Mobx
import {observer, inject} from 'mobx-react';
import LabelingImgStore from '../stores/LabelingImgStore';

interface Props extends RouteComponentProps<any> {
    navigate?: any
    type?: string;
}

interface Props {
    labelingImgStore?: LabelingImgStore;
}

interface State {
    image: any;
    images: any[];
}

interface MatchParams {
    postId: string;
}

@inject('labelingImgStore')
@observer

class PageLabelingImgSel extends React.Component<Props, State, RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    this.props.labelingImgStore!.getImgList();
    this.props.labelingImgStore!.setSelectList([]);
    this.state = {
      image: null,
      images: [],
    };
  }

    onPickImage = (image: any) => {
      this.setState({image});
    };
    onPickImages = (images: any) => {
      this.setState({images});
      this.props.labelingImgStore!.setSelectList(this.state.images);
    };

    // 라벨링 다음 버튼 onclick 함수 부분(이런 식으로 만들어서 넣으면 될 듯)
    handleLink = (e: any) => {
      // TODO: 선택한 사진 API로 보내기
      var num = parseInt(this.props.match.params.dataId) + 1;
      this.props.history.push(`/labeling/${this.props.match.params.postId}/imgsel/${num}`);
    }

    render() {
      return (
        <Container style={{marginTop: 50}}>
          <Header as='h2'>강아지 이미지 데이터를 통한 이미지 학습 모델 구현</Header>
          <Header as='h4'>#1. 강아지를 선택하시오.</Header>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <ImagePicker
                  images={this.props.labelingImgStore!.imgList[0].data.map((image:string, i:number) => ({
                    src: image,
                    value: i,
                  }))}
                  onPick={this.onPickImages.bind(this)}
                  multiple
                />
              </Grid.Column>
              <Grid.Column className='imageSelectRightGrid'>
                {/* 원래는 next button 이 보이는게 정상적인데 */}
                {/* 지금 imgList 의 길이가 1 이라서 지금 있는게 맨 마지막 인덱스라 */}
                {/* 종료 버튼이 나옴 */}
                <div className='finishButtonLocation'>
                  {Number(this.props.match.params.dataId) + 1 !==
                  this.props.labelingImgStore?.
                  imgList.length ?
                  <LabelingNextBtn handleLink={this.handleLink}/> :
                  <LabelingFinishButton/>}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
}

export default withRouter(PageLabelingImgSel);
