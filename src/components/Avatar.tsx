import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import './Avatar.css';

interface Props extends RouteComponentProps<any>{
    id?: string
    thumbnail?: string
}

class Avatar extends React.Component<Props> {
  render() {
    return (
      <div className='avatar'>
        <Image style={{height: '50px', width: '50px'}} src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
      </div>
    );
  }
}

export default withRouter(Avatar);
