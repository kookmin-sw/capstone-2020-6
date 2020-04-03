import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container } from "semantic-ui-react"

interface Props extends RouteComponentProps<any>{
  navigate?: any
}

class App extends React.Component<Props> {
  render() {
    console.log(this.props.navigate)
    return (
      <Container>
      Register
      </Container>
    )
  }
}

export default withRouter(App);
