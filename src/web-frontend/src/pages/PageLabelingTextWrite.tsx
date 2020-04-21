import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Button, Container, Grid} from 'semantic-ui-react';
import './PageLabelingTextWrite.css';

// Components
import JInput from '../components/JInput';

// for Mobx
import {inject, observer} from 'mobx-react';
import LabelingTextWriteStore from '../stores/LabelingTextWriteStore';

interface Props extends RouteComponentProps<any>{
    labelingTextWriteStore?: LabelingTextWriteStore;
}

@inject('labelingTextWriteStore')
@observer
class PageLabelingTextWrite extends React.Component<Props> {
  constructor(props: any) {
    super(props);
      this.props.labelingTextWriteStore?.getLabelingSubject();
      this.props.labelingTextWriteStore?.getTextLabelingContents();
  }
  render() {
    return (
      <Container className='container'>
        <div className='labelingTitle'>
          <h2>{this.props.labelingTextWriteStore?.labelingSubject}</h2>
        </div>
        <Grid columns={2}>
          <Grid.Column className='textLabelingContents'>
            {this.props.labelingTextWriteStore?.textLabelingContents}
          </Grid.Column>
          <Grid.Column>
            <div className='subTitle'>
              1. 다음 글의 유형을 입력하시오.
            </div>
            <div className='textLabelingAnswerBox'>
              <JInput
                style={{width: '80%'}}
                placeholder='다음 글의 유형을 적어주세요.'
                value={''}
                type='text'/>
              <Button
                color={'blue'}
                style={{width: '18%'}}>
                입력
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextWrite);
