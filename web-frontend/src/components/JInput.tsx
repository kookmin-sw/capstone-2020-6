import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './JInput.css';
import { Container } from "semantic-ui-react";

interface Props extends RouteComponentProps<any> {
  navigator?: any,
  label?: string,
  placeholder?: string,
  value?: string,
  onChange?: any
}

class JInput extends React.Component<Props> {
  static defaultProps = {
    onChange: () => {}
  }
  render() {
    return (
      <>
        {
          this.props.label ? (
            <div className="jinput_label">
              {this.props.label}
            </div>
          ) : <></>
        }
        <input
          className="jinput"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}

export default withRouter(JInput);
