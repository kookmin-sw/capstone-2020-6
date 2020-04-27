import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any>{

}

class PageMypageProject extends React.Component<Props> {
    render() {
        return (
            <Container>
                Project manage
            </Container>
        );
    }
}

export default withRouter(PageMypageProject);
