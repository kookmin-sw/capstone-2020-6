import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Container, Button, Grid} from 'semantic-ui-react';
import './PageLabelingImageCapture.css';
import LabelingImgCapStore from '../stores/LabelingImgCapStore';
import {inject, observer} from "mobx-react";
import LabelingNextBtn from "../components/LabelingNextBtn";
import LabelingFinishButton from "../components/LabelingFinishButton";


interface Props extends RouteComponentProps<any> {
}

interface Props{
    labelingImgCapStore?: LabelingImgCapStore;
}

interface State {
    src: string;
    crop: any
}

@inject('labelingImgCapStore')
@observer

class PageLabelingImageCapture extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    let idx = parseInt(this.props.match.params.postId)
    this.props.labelingImgCapStore?.setIdx(idx)
    this.props.labelingImgCapStore?.getRequest()
    this.props.labelingImgCapStore?.getItem()
    this.state = {
      src: '',
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  }

  onCropComplete = (crop: any) => {
    console.log('onCropComplete', crop);
  }

  onCropChange = (crop: any) => {
    this.setState({crop: crop});
  }

  handleLink = (e: any) => {
    // TODO: 선택한 버튼 API 로 보내기
    this.props.labelingImgCapStore?.resetActiveButton();
    var num = parseInt(this.props.match.params.dataId) + 1;
    this.props.history.push(`/labeling/${this.props.match.params.postId}/3/${num}`);
  }

  onCapture = (crop: any) =>{
      alert('캡처되었습니다.');

  }

  render() {
    return (
      <Container className='capture_box'>
        <div className='labelingTitle'>
          <h2>{this.props.labelingImgCapStore?.labelingSubject}</h2>
        </div>
          <Grid columns={1}>
              <Grid.Column textAlign="center" style={{backgroundColor: "#f2f2f2"}}>
                <ReactCrop
                  src={this.props.labelingImgCapStore?.data || ""}
                  crop={this.state.crop}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              </Grid.Column>
              <Grid.Column>
              <div className='subTitle'>
                {this.props.labelingImgCapStore?.labelingText}
              </div>
              <Grid className='imagePreviewCanvas'>
              <div
                style={{
                  backgroundImage: `url(${this.props.labelingImgCapStore?.data || ""})`,
                  backgroundPositionX: `-${this.state.crop.x}px`,
                  backgroundPositionY: `-${this.state.crop.y}px`,
                  backgroundRepeat: 'no-repeat',
                  width: this.state.crop.width,
                  height: this.state.crop.height,
                }}
              />
              </Grid>
              <br/><br/>
              <Grid className='captureButtonGrid'>
              {/* TODO: Implement onClick method */}
              <Button color={'blue'} className='captureButton' onClick={()=>this.onCapture(this.state.crop)}>
              캡쳐
              </Button>
              </Grid>
              <div className='finishButtonLocation'>
                  {/* TODO: 버튼 눌렀을 때 선택된 값 저장 + 버튼 눌린 상태 초기화 해줘야함 */}
                  {Number(this.props.match.params.dataId) + 1 !==
                  this.props.labelingImgCapStore?.
                      imgList.length ?
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

export default withRouter(PageLabelingImageCapture);
