import React from 'react';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Button, Container, Table} from 'semantic-ui-react';
import './PageViewAllProjectsFinished.css';

// Components
import JInput from '../components/JInput';
import ProjectListTable from '../components/ProjectListTable';
import Datetime from '../components/DateTime';

// for mobx
import {inject, observer} from 'mobx-react';
import ProjectListStore from '../stores/ProjectListStore';

interface Props extends RouteComponentProps<any> {
  projectListStore?: ProjectListStore
}

@inject('projectListStore')
@observer
class PageViewAllProjectsFinished extends React.Component<Props> {
  state = {
    list: this.props.projectListStore!.allListEnd,
  };
  constructor(props: any) {
    super(props);
      this.props.projectListStore?.getProjects('END');
      this.props.projectListStore?.getSearchKeyword();
  }
  // TODO: Resolve search error.
  search = () => {
    this.props.projectListStore?.searchProjects('END');
    this.setState({
      list: this.props.projectListStore!.searchList,
    });
  }
  render() {
    return (
      <Container>
        <div className='projectSearchBar'>
          <h2 className='allProjectHeader'>완료된 프로젝트</h2>
          <div className='searchBarBox'>
            <JInput
              style={{width: '300px'}}
              placeholder='프로젝트 이름'
              value={this.props.projectListStore?.searchKeyword}
              onChange={this.props.projectListStore?.setSearchKeyword}
              type='text'/>
            <Button
              color={'blue'}
              style={{marginLeft: '10px', width: '100px', height: '37px'}}
              onClick={this.search}>
                검색
            </Button>
          </div>
        </div>
        <ProjectListTable
          header={[
            {id: 1, headerItem: '#'},
            {id: 2, headerItem: '주제명'},
            {id: 3, headerItem: '레이블링 유형'},
            {id: 4, headerItem: '시작일'},
            {id: 5, headerItem: '마감일'},
            {id: 6, headerItem: '진행 상황'},
          ]}
          body={this.state.list.map((item: any, idx: number) => {
            return (
              // TODO: Sort projects by id.
              <Table.Row key={idx+1}>
                <Table.Cell>{idx+1}</Table.Cell>
                <Table.Cell>
                  <Link to={`/labeling/${item.id}`}>
                    <div>
                      {item.title}
                    </div>
                  </Link>
                </Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell><Datetime datetime={item.start_date}/></Table.Cell>
                <Table.Cell><Datetime datetime={item.end_date}/></Table.Cell>
                <Table.Cell>{item.progress}/{item.all}</Table.Cell>
              </Table.Row>
            );
          })}
        />
      </Container>
    );
  }
}

export default withRouter(PageViewAllProjectsFinished);
