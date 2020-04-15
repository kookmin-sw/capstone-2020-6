import React from 'react';
import {Container} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './Footer.css';

interface Props extends RouteComponentProps<any>{
}

class Footer extends React.Component<Props> {
  render() {
    return (
      // TODO(yeohwan): Have to implement footer contents.
      <Container>
        <div className='footer1'>
          Copyright &copy; T-SAN of Kookmin University Capstone Project
        </div>
        <div className='footer2'>
          이정하 박상일 박지희 윤여환 이다은 장태진
        </div>
      </Container>
    );
  }
}

export default withRouter(Footer);
