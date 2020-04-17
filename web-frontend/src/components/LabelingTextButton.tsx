import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Button} from 'semantic-ui-react';

import './LabelingTextButton.css';

interface Props extends RouteComponentProps<any> {
    navigate?: any;
    category?: any;
    onClick?: any;
    value?: number;
}

class LabelingTextButton extends React.Component<Props> {
  render() {
    return (
      <div className='buttonContainer'>
        {
          this.props.category?.map((item:any) => {
            return (
              <Button
                className='textLabelingButton'
                active={this.props.value === item.id}
                onClick={() => {
                  this.props.onClick(item.id);
                }}
              >
                {item.category}
              </Button>
            );
          })
        }
      </div>
    );
  }
}

export default withRouter(LabelingTextButton);
