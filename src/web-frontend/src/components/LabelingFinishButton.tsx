import React from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import './LabelingFinishButton.css';

class LabelingFinishButton extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/mypage/projects`}>
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

export default LabelingFinishButton;
