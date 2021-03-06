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
            <br/>
            <div>티끌 모아 태산 T-SAN에서 데이터 레이블링을 통한 보상을 얻어보세요.</div>
            저희 T-SAN 플랫폼은 자체적으로 데이터셋을 확보하고<br/>
            레이블링을 진행하여 인공지능 사업 발전에 기여할 수 있습니다.
          </Container>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
