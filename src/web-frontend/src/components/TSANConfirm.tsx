import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Confirm} from 'semantic-ui-react'

interface Props extends RouteComponentProps<any> {
    open?: any;
    handleCancel?: any;
    handleConfirm?: any;
    header?: string;
    contents?: string[];
}

class TSANConfirm extends React.Component<Props> {
    render() {
        return (
            <div>
                <Confirm
                    open={this.props.open}
                    header={this.props.header}
                    content={this.props.contents!.map((item: any, key:any)=>{
                        return( <p key={key}>{item}</p>);
                    })}
                    cancelButton={'취소'}
                    confirmButton={'확인'}
                    onCancel={this.props.handleCancel}
                    onConfirm={this.props.handleConfirm}/>
            </div>
        );
    }
}

export default withRouter(TSANConfirm);
