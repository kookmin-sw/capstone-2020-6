import React from 'react';
import {Button, Container, Modal} from 'semantic-ui-react';
import {withRouter, RouteComponentProps} from 'react-router';

// Components
import ImagePicker from '../components/image_picker';

// for mobx
import {inject, observer} from 'mobx-react';
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
  open: boolean;
}

interface MatchParams {
  postId: string;
}

// TODO: Change Store
@inject('labelingImgStore')
@observer
class PageCaptcha extends React.Component<Props, State, RouteComponentProps<MatchParams>> {
  constructor(props: any) {
    super(props);
    // this.props.labelingImgStore!.getImgList();
    this.props.labelingImgStore!.setSelectList([]);
    this.state = {
      image: null,
      images: [],
      open: false,
    };
  }

  onPickImage = (image: any) => {
    this.setState({image});
  }
  onPickImages = (images: any) => {
    this.setState({images});
    this.props.labelingImgStore!.setSelectList(this.state.images);
  }

  render() {
    return (
      <Container>
        <div style={{textAlign: 'center', flexDirection: 'column'}}>
          <br/>
          {/* TODO: Modify contents */}
          CAPTCHA 에 대한 설명을 적어두면 좋을 것 같음.
          <br/>
          <br/>
          <Button
            color={'blue'}
            onClick={
              () => {
                this.setState({open: true});
              }
            }>
            CAPTCHA Test
          </Button>
          <Modal open={this.state.open}>
            <Modal.Header>다음 중 강아지 사진을 선택하세요.</Modal.Header>
            {/* TODO: Alignment center */}
            <Modal.Content>
              <ImagePicker
                images={this.props.labelingImgStore!.imgList.map((image: string, i: number) => ({src: image, value: i}))}
                onPick={this.onPickImages.bind(this)}
                multiple/>
            </Modal.Content>
            <Modal.Actions>
              {/* TODO: Implement onClick method */}
              <Button
                color={'blue'}
                onClick={
                  () => {
                    this.setState({open: false});
                  }
                }>
                제출
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
      </Container>
    );
  }
}

export default withRouter(PageCaptcha);
