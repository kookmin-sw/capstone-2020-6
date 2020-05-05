import React from 'react';
import {Button, Container, Grid, Icon} from 'semantic-ui-react';
import {withRouter, RouteComponentProps} from "react-router";

import './LabelingNextBtn.css'

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
                <Button className='nextBtn' circular icon='forward' size='massive' onClick={this.props.handleLink}/>
            </div>
        );
    }
}

// @ts-ignore
export default withRouter(LabelingNextBtn);
