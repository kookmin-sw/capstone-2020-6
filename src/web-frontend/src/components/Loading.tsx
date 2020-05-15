import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props extends RouteComponentProps<any>{
}

class Loading extends React.Component<Props> {
  render() {
    return (
      <div>
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default withRouter(Loading);
