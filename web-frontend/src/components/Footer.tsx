import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import './Footer.css';

interface Props extends RouteComponentProps<any>{
}

class Footer extends React.Component<Props> {
  render() {
    return (
      // TODO(yeohwan): Have to implement footer contents.
      <div className='footer'>
        Footer
      </div>
    );
  }
}

export default withRouter(Footer);
