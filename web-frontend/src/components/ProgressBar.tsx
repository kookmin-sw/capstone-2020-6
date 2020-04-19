import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Progress} from "semantic-ui-react"
import './ProgressBar.css'

interface Props extends RouteComponentProps<any> {
    navigate?: any,
    progress?: string,
    all?:string,
    progress_rate?:string,
    size: any,
}

class ProgressBar extends React.Component<Props> {
    render() {
        return (
            <div className="progress_container">
                <Progress
                    percent={this.props.progress_rate}
                    label={this.props.progress + '/' + this.props.all}
                    size={this.props.size}
                />
            </div>
        )
    }
}

export default withRouter(ProgressBar);
