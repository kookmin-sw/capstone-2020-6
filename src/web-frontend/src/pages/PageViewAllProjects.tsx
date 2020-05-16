import React from 'react';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Button, Container, Table} from 'semantic-ui-react';
import './PageViewAllProjects.css';

// Components
import JInput from '../components/JInput';
import ProjectListTable from '../components/ProjectListTable';

// for mobx
import {inject, observer} from 'mobx-react';
import PageViewAllProjectsStore from '../stores/PageViewAllProjectsStore';

interface Props extends RouteComponentProps<any> {
  pageViewAllProjectsStore?: PageViewAllProjectsStore
}

@inject('pageViewAllProjectsStore')
@observer
class PageViewAllProjects extends React.Component<Props> {
  constructor(props: any) {
    super(props);
      this.props.pageViewAllProjectsStore?.getAvailableProject();
      this.props.pageViewAllProjectsStore?.getSearchKeyword();
  }

  // TODO: Implement search query.
  search = () => {
    console.log(this.props.pageViewAllProjectsStore?.searchKeyword);
  }

  render() {
    return (
      <Container>
        <div className='projectSearchBar'>
          <h2 className='allProjectHeader'>현재 진행중인 프로젝트</h2>
          <div className='searchBarBox'>
            <JInput
              style={{width: '300px'}}
              placeholder='프로젝트 이름'
              value={this.props.pageViewAllProjectsStore?.searchKeyword}
              onChange={this.props.pageViewAllProjectsStore?.setSearchKeyword}
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
          body={this.props.pageViewAllProjectsStore!.list.map((item: any) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>
                  <Link to={`/labeling/${item.id}`}>
                    <div>
                      {item.title}
                    </div>
                  </Link>
                </Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                {/* TODO: Change to date format. */}
                <Table.Cell>2020.01.01</Table.Cell>
                <Table.Cell>2020.05.05</Table.Cell>
                <Table.Cell>{item.progress}/{item.all}</Table.Cell>
              </Table.Row>
            );
          })}
        />
      </Container>
    );
  }
}

export default withRouter(PageViewAllProjects);
