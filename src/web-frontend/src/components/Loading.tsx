import React from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react';

interface Props {
    load?:boolean;
}

class Loading extends React.Component<Props> {
    render() {
        return (
            <Container>
                <Dimmer active={this.props.load}>
                    <Loader/>
                </Dimmer>
            </Container>
        );
    }
}

export default Loading;
