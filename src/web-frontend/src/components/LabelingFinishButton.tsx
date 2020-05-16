import React from 'react';
import {Button} from 'semantic-ui-react';
import {History, LocationState} from 'history';
import {RouteComponentProps, withRouter} from 'react-router';
import './LabelingFinishButton.css';

// Components
import Confirm from './TSANConfirm';


interface Props {
  history: History<LocationState>;
}

interface State {
  open: boolean;
}

class LabelingFinishButton extends React.Component<Props, State, RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  show = () => this.setState({open: true});
  handleConfirm = () => {
    this.setState({open: false});
    this.props.history.push('/mypage/projects');
  };
  handleCancel = () => this.setState({open: false});
  render() {
    const {open} = this.state;
    return (
      <div>
        <Button
          className='finishBtn'
          color={'red'}
          onClick={this.show}>
          종료
        </Button>
        <Confirm
          header={'알림'}
          contents={['프로젝트를 완료하시겠습니까?']}
          open={open}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(LabelingFinishButton);
