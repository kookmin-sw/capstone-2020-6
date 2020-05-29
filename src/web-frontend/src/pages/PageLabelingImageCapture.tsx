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

  onCapture = (check:boolean) =>{
    let data = { x: 0, y: 0, width: 0, height: 0}
    if(check) {
      data = this.state.crop
    }
    this.props.labelingImgCapStore?.submitLabel(
      data,
      () => {
        this.setState({
          crop: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          }
        })
        this.props.labelingImgCapStore?.getItem()
      }
    )  
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
              <Grid className='imagePreviewCanvas' style={{padding: 50}}>
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
            </Grid.Column>
          </Grid>

          <div style={{textAlign: "center", marginTop: 50}}>
              <div>
                남은 데이터: {this.props.labelingImgCapStore?.leftItems}
              </div>
              <div>
                <Button color={'blue'} onClick={()=>this.onCapture(true)}>
                제출하기
                </Button>
                <Button color={'red'} onClick={()=>this.onCapture(false)}>
                영역 지정을 할 수 없습니다.
                </Button>
              </div>
          </div>

      </Container>
    );
  }
}

export default withRouter(PageLabelingImageCapture);
