import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{

}

class PageLabeling extends React.Component<Props> {
  render() {
    return (
      <Container>
        Labeling Page(참여전 설명)
      </Container>
    );
  }
}

export default withRouter(PageLabeling);
