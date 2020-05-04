import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Dropdown} from 'semantic-ui-react';

import {observer} from 'mobx-react';

interface Props extends RouteComponentProps<any> {
    placeholder: string;
    labelingType: any;
    handleChange: any;
    value:string;
}

@observer
class TsDropDown extends React.Component<Props> {
    render() {
        return (
            <div>
                <Dropdown
                    placeholder={this.props.placeholder}
                    fluid
                    search
                    selection
                    value={this.props.value}
                    options={this.props.labelingType}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default withRouter(TsDropDown);
