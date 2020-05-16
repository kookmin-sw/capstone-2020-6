import React from 'react';
import {Button} from 'semantic-ui-react';
import {withRouter, RouteComponentProps} from 'react-router';

interface Props {
    history: any;
    match: any;
    handleLink: any;
}

class LabelingNextBtn extends React.Component<Props, RouteComponentProps> {
  render() {
    return (
      <div>
        <Button
          className='nextBtn'
          circular
          icon='forward'
          color='blue'
          onClick={this.props.handleLink}/>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(LabelingNextBtn);
