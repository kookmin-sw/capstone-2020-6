import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{

}

class PageLabelingTextWrite extends React.Component<Props> {
  render() {
    return (
      <Container>
        Text Labeling 단답형
      </Container>
    );
  }
}

export default withRouter(PageLabelingTextWrite);
