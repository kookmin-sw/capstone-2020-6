import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container } from "semantic-ui-react"
import "./PageMain.css"

interface Props extends RouteComponentProps<any>{
  navigate?: any
}

class App extends React.Component<Props> {
  render() {
    console.log(this.props.navigate)
    return (
      <>
        <div className="main_body_image" style={{backgroundImage: "url('/body.jpg')"}}/>
      </>
    )
  }
}

export default withRouter(App);
