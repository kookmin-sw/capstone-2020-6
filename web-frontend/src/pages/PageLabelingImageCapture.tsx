import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Container} from 'semantic-ui-react';

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
        x: 10,
        y: 10,
        width: 20,
        height: 20,
      },
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount(): void {
    this.setState({src: '/images/body.jpg'});
  }

  onCropComplete = (crop: any) => {
    console.log('onCropComplete', crop);
  }

  onCropChange = (crop: any) => {
    this.setState({crop});
  }

  render() {
    return (
      <Container className="App">
        <ReactCrop
          src={this.state.src}
          crop={this.state.crop}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
      </Container>
    );
  }
}

export default withRouter(PageLabelingImageCapture);
