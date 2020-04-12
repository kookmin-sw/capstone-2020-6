import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

// for components
import LabelingTextButton from '../components/LabelingTextButton';

// for mobx
// import LabelingTextButtonStore from '../stores/LabelingTextButtonStore';
// import {inject, observer} from 'mobx-react';

interface Props extends RouteComponentProps<any>{
    navigate?: any,
    // labelingTextButtonStore?: LabelingTextButtonStore,

}

// @inject('LabelingTextButtonStore')
// @observer
class Labeling extends React.Component<Props> {
  render() {
    return (
      <Container>
        {/*<LabelingTextButton/>*/}
      </Container>
    );
  }
}

export default withRouter(Labeling);
