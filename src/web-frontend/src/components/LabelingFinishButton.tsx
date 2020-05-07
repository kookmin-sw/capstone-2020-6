import React from 'react';
import {Button} from 'semantic-ui-react';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {History, LocationState} from 'history';

import './LabelingFinishButton.css';

interface Props {
  history: History<LocationState>;
  match: any;
}

interface State {
  postId: string;
}

class LabelingFinishButton extends React.Component<Props, State, RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      postId: '',
    };
  }

  UNSAFE_componentWillMount(): void {
    const parserArray = this.props.match.url.split('/');
    this.setState({postId: parserArray[2]});
  }

  render() {
    return (
      <div>
        <Link to={`/labeling/${this.state.postId}/finish`}>
          <Button
            className='finishBtn'
            color={'red'}>
            종료
          </Button>
        </Link>
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(LabelingFinishButton);
