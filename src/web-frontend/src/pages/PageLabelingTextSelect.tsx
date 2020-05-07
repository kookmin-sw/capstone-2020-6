import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import './PageLabelingTextSelect.css';

// Components
import LabelingTextButton from '../components/LabelingTextButton';

// for Mobx
import {inject, observer} from 'mobx-react';
import LabelingTextSelectStore from '../stores/LabelingTextSelectStore';

interface Props {
  labelingTextButtonStore?: LabelingTextSelectStore,
}

@inject('labelingTextButtonStore')
@observer
class PageLabelingTextSelect extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.props.labelingTextButtonStore!.getLabelingSubject();
    this.props.labelingTextButtonStore!.getButtons();
    this.props.labelingTextButtonStore!.getTextLabelingContents();
  }

  render() {
    return (
      <Container className='container'>
        <div className='labelingTitle'>
          <h2>{this.props.labelingTextButtonStore?.labelingSubject}</h2>
        </div>
        <Grid columns={2}>
          <Grid.Column className='textLabelingContents'>
            {this.props.labelingTextButtonStore?.textLabelingContents}
          </Grid.Column>
          <Grid.Column>
            <div className='subTitle'>
              1. 다음 글의 유형을 선택하시오.
            </div>
            <LabelingTextButton
              category={
                this.props.labelingTextButtonStore!.buttonList
              }
              value={
                this.props.labelingTextButtonStore?.activeButton
              }
              onClick={this.props.labelingTextButtonStore?.setActiveButton}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default PageLabelingTextSelect;
