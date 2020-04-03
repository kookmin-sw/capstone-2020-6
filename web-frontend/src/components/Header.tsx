import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './Header.css';
import {Container} from "semantic-ui-react";

interface Props extends RouteComponentProps<any> {
}

// eslint-disable-next-line require-jsdoc
class Header extends React.Component<Props> {
  // eslint-disable-next-line require-jsdoc
  render() {
    return (
      <div className="main_body_image"
        style={{backgroundImage: "url('/images/body.jpg')"}}>
        <div>
          <span>T-SAN, 티끌모아 태산</span>
          <Container className="main_body_text">
            T-SAN은 Ex dolore veniam fugiat quis adipisicing esse sunt
            ea enim eu consectetur ea sunt ad.Quideserunt fugiat id
            aliquip esse laboris irure in adipisicing occaecat sint
            est. Lorem exercitation duis adipisicing veniam ullamco
            minim nostrud. Amet sint cillum enim dolore consectetur
            veniam enim id consequat commodo commodo nostrud.
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
