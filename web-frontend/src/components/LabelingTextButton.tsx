import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

import './LabelingTextButton.css';

interface Props extends RouteComponentProps<any> {
    navigate?: any;
    category?: string;
}

class LabelingTextButton extends React.Component<Props> {
  render() {
    return (
      <div className='buttonContainer'>
        <Button className='button'>
          {this.props.category}
        </Button>
      </div>
    );
  }
}

export default withRouter(LabelingTextButton);
