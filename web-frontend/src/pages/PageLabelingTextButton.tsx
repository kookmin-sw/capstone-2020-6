import React, {ReactComponentElement} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Button, Container, Grid} from 'semantic-ui-react';
import LabelingTextButtonStore from '../stores/LabelingTextButtonStore';

import './PageLabelingTextButton.css';
import {inject, observer} from 'mobx-react';

interface Props {
    navigate?: any,
    labelingTextButtonStore?: LabelingTextButtonStore,
}

@inject(' labelingTextButtonStore')
@observer
class PageLabelingTextButton extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.props.labelingTextButtonStore!.getButtons();
  }

  render() {
    console.log(this.props.labelingTextButtonStore!.buttonList)
    return (
      <Container className='container'>
        <div className='labelingTitle'>
          Labeling 주제 들어갈거
        </div>
        <div className='mainContainer'>
          <div className='left'>
            생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이,
            하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고,
            때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고,
            위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서
            품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에
            천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고
            밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게
            보내는 무엇을 있는가?
            <br/><br/>
            생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이,
            하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고,
            때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고,
            위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서
            품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에
            천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고
            밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게
            보내는 무엇을 있는가?
            <br/><br/>
            생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이,
            하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고,
            때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고,
            위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서
            품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에
            천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고
            밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게
            보내는 무엇을 있는가?
          </div>
          <div className='right'>
            <div className='subTitle'>
              1. 다음 글의 유형을 선택하시오.
            </div>
            <Grid className='buttonGroup' column={2}>
              <Button className='button'>1</Button>
              <Button className='button'>2</Button>
              <Button className='button'>3</Button>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default PageLabelingTextButton;
