import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './JInput.css';
import {Dropdown} from "semantic-ui-react";

interface Props extends RouteComponentProps<any> {
  navigator?: any,
  label?: string,
  placeholder?: string,
  value?: string,
  onChange?: any,
  type?: string,
  style?: any
}

class JSelect extends React.Component<Props> {
  static defaultProps = {
    onChange: () => { },
    type: "text",
    style: {}
  }
  render() {
    return (
      <div style={this.props.style}>
        {
          this.props.label ? (
            <div className="jinput_label">
              {this.props.label}
            </div>
          ) : <></>
        }
        <Dropdown
          fluid
          className="jinput"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          type={this.props.type}
          style={{
            textAlign: "right"
          }}
        />
      </div>
    );
  }
}

export default withRouter(JSelect);
