import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{

}

class PagePoints extends React.Component<Props> {
  render() {
    return (
      <Container>
        Points page
      </Container>
    );
  }
}

export default withRouter(PagePoints);
