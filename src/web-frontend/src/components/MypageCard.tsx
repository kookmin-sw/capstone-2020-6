import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Card, Button} from "semantic-ui-react";

interface Props extends RouteComponentProps<any> {
    userType: string;
    title: string;
    description: string;
    btnType: string;
    route: string;
}

class MypageCard extends React.Component<Props> {
    render() {
        return (
            <div>
                <Card>
                    <Card.Content className="mycard_content">
                        <Card.Header>
                            {this.props.title}
                        </Card.Header>
                        <Card.Description className="mycard_description">
                            {this.props.description}
                        </Card.Description>
                    </Card.Content>
                    <Button className="mycard_btn" href={this.props.route} color="grey">
                        {this.props.btnType}
                    </Button>
                </Card>

            </div>
        );
    }
}

export default withRouter(MypageCard);
