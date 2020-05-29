import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Header, Grid, Container, Button, Dimmer, Loader } from 'semantic-ui-react';
import './PageLabelingImgSelect.css';

// Components
import ImagePicker from '../components/image_picker';
import LabelingNextBtn from '../components/LabelingNextBtn';
import LabelingFinishButton from '../components/LabelingFinishButton';

// for Mobx
import { observer, inject } from 'mobx-react';
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

@inject('labelingImgStore') @observer
class PageLabelingImgSel extends React.Component<Props, State, RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    let idx = parseInt(this.props.match.params.postId)
    this.props.labelingImgStore?.setIdx(idx)
    this.props.labelingImgStore?.getRequest();
    this.props.labelingImgStore?.getItem();
    // this.props.labelingImgStore!.getImgList();
    this.props.labelingImgStore!.setSelectList([]);
    this.state = {
      image: null,
      images: [],
    };
  }

  onPickImages = (images: any) => {
    this.props.labelingImgStore!.setSelectList(images);
  };

  // 라벨링 다음 버튼 onclick 함수 부분(이런 식으로 만들어서 넣으면 될 듯)
  handleLink = (e: any) => {
    const items:any[] = []
    this.props.labelingImgStore?.selectList.forEach((item:any) => {
      items.push(item.value)
    })
    this.props.labelingImgStore?.submit(items)
    // TODO: 선택한 사진 API로 보내기
    // var num = parseInt(this.props.match.params.dataId) + 1;
    // this.props.history.push(`/labeling/${this.props.match.params.postId}/2/${num}`);
  }

  render() {
    return (
      <Container style={{ marginTop: 50 }}>
        <div style={{ width: 600, margin: "auto" }}>
          <Header as='h2'>{this.props.labelingImgStore?.labelingSubject}</Header>
          <Header as='h4'>{this.props.labelingImgStore?.labelingText}</Header>
          <Grid columns={1}>
            <Grid.Column>
              <ImagePicker
                images={this.props.labelingImgStore?.imgList.map((data: any) => ({
                  src: data['image'],
                  value: data['value'],
                }))}
                onPick={this.onPickImages.bind(this)}
                multiple
              />
              <div>관련 사진이 없는 경우 선택하지 않으셔도됩니다.</div>
              <div>남은 데이터셋: {this.props.labelingImgStore?.leftItems}개, 약 {Number(this.props.labelingImgStore?.leftItems)/9} 세트 남음</div>
            </Grid.Column>
            <Grid.Column className='imageSelectRightGrid'>
              {/* 원래는 next button 이 보이는게 정상적인데 */}
              {/* 지금 imgList 의 길이가 1 이라서 지금 있는게 맨 마지막 인덱스라 */}
              {/* 종료 버튼이 나옴 */}
              <div>
                {Number(this.props.match.params.dataId) + 1 !==
                  this.props.labelingImgStore?.
                    imgList.length ?
                    <Button color="blue" onClick={this.handleLink}>다음으로</Button>:
                    <LabelingFinishButton />
                  }
              </div>
            </Grid.Column>
          </Grid>
        </div>
        <Dimmer active={this.props.labelingImgStore?.isLoading}>
          <Loader />
        </Dimmer>
      </Container>
    );
  }
}

export default withRouter(PageLabelingImgSel);
