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
        <div className="main_body_image" style={{backgroundImage: "url('/body.jpg')"}}>
          <div>
            <span>T-SAN, 티끌모아 태산</span>
            <Container className="main_body_text">
              T-SAN은 Ex dolore veniam fugiat quis adipisicing esse sunt ea enim eu consectetur ea sunt ad. Qui deserunt fugiat id aliquip esse laboris irure in adipisicing occaecat sint est. Lorem exercitation duis adipisicing veniam ullamco minim nostrud. Amet sint cillum enim dolore consectetur veniam enim id consequat commodo commodo nostrud. Aliquip eiusmod elit dolor proident qui laboris sint amet ad reprehenderit nisi.
              Do irure sit cupidatat commodo ex dolor cupidatat et deserunt consequat non do magna aute. Cupidatat fugiat nisi consectetur consectetur tempor sint adipisicing voluptate nisi. Lorem eiusmod magna nostrud enim.
            </Container>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(App);
