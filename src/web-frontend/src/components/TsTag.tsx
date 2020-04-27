import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Image} from 'semantic-ui-react';

import {observer} from 'mobx-react';

interface State{
}
interface Props {
}

@observer
class TsTag extends React.Component<Props, State> {
    constructor(props:any) {
        super(props);
    }


    render() {
        return (
            <div>
            </div>
        );
    }
}

export default TsTag;
