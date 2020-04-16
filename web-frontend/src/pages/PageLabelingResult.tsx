import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{

}

class PageLabelingResult extends React.Component<Props> {
  render() {
    return (
      <Container>
        Labeling Result Page
      </Container>
    );
  }
}

export default withRouter(PageLabelingResult);
