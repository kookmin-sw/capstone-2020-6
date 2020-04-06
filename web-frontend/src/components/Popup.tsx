import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button, Grid, Header, Segment, Portal} from 'semantic-ui-react'
import './MyPageCard.css'

interface Props extends RouteComponentProps<any> {
    open?: any;
    handleClose?: any;
    handleCorrect?: any;
    header?: string;
    contents?: string[];
}

class Popup extends React.Component<Props> {

    render() {
        return (
            <div>
                <Portal onClose={this.props.handleClose} open={this.props.open}>
                    <Segment
                        style={{
                            left: '40%',
                            position: 'fixed',
                            top: '30%',
                            zIndex: 1000,
                        }}
                    >
                        <Header>{this.props.header}</Header>
                        {this.props.contents!.map((item: any, key:any)=>{
                            return( <p key={key}>{item}</p>);
                        })}
                        <Button
                            content='확인'
                            color="blue"
                            onClick={this.props.handleCorrect}
                        />
                        <Button
                            content='취소'
                            onClick={this.props.handleClose}
                        />
                    </Segment>
                </Portal>
            </div>
        );
    }
}

export default withRouter(Popup);
