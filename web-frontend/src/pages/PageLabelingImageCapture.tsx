import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Container, Button, Grid} from 'semantic-ui-react';
import './PageLabelingImageCapture.css';

interface Props extends RouteComponentProps<any> {

}

interface State {
    src: string;
    crop: any
}

class PageLabelingImageCapture extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      src: '',
      crop: {
        x: 205,
        y: 111,
        width: 120,
        height: 120,
      },
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount(): void {
    this.setState({src: 'https://www.futurekorea.co.kr/news/photo/201910/121674_123146_2638.jpg'});
  }

  onCropComplete = (crop: any) => {
    console.log('onCropComplete', crop);
  }

  onCropChange = (crop: any) => {
    this.setState({crop});
  }

  render() {
    return (
      <Container>
        <div className='labelingTitle'>
          <h2>비문 인식을 위한 강아지 코 labeling</h2>
        </div>
        <Grid columns={2}>
          <Grid.Column className='labelingImageCapture'>
            <ReactCrop
              src={this.state.src}
              crop={this.state.crop}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </Grid.Column>
          <Grid.Column className='labelingCaptureResult'>
            <div className='subTitle'>
              1. 강아지 코를 찾아서 캡쳐해주세요.
            </div>
            <Grid className='imagePreviewCanvas'>

            </Grid>
            <br/><br/>
            <Grid className='captureButtonGrid'>
              <Button color={'blue'} className='captureButton'>
                캡쳐
              </Button>
            </Grid>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(PageLabelingImageCapture);
