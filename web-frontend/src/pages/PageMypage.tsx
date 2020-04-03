import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{
    navigate?: any
}

class Mypage extends React.Component<Props> {
  render() {
    return (
      <Container>
        My Page
      </Container>
    );
  }
}

export default withRouter(Mypage);
