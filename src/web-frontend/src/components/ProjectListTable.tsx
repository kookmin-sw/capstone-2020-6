import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Table} from 'semantic-ui-react';

interface Props extends RouteComponentProps<any> {
  header: any
  body: any
}

class ProjectListTable extends React.Component<Props> {
  render() {
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {this.props.header.map((item: any) => {
                return (
                  <Table.HeaderCell key={item.id}>
                    {item.headerItem}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.body}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default withRouter(ProjectListTable);
