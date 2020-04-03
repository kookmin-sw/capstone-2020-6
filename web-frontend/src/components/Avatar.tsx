import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import './Avatar.css';
import {observer} from 'mobx-react';

interface Props extends RouteComponentProps<any>{
    userId?: string
    thumbnail?: string
}

@observer
class Avatar extends React.Component<Props> {
  render() {
    return (
      <div className='avatar'>
        <Image style={{height: '45px', width: '45px'}}
          src={this.props.thumbnail} avatar />
      </div>
    );
  }
}

export default withRouter(Avatar);
