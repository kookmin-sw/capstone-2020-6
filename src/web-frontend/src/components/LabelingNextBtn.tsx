import React from 'react';
import {Button} from 'semantic-ui-react';
import {withRouter, RouteComponentProps} from 'react-router';

interface Props {
    history: any;
    match: any;
    handleLink: any;
}

class LabelingNextBtn extends React.Component<Props, RouteComponentProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* TODO: Button Design 을 손보는게 좋을 것 같음! */}
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
