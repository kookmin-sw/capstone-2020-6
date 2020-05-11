import React from 'react';
import {RouteComponentProps, withRouter, Link} from 'react-router-dom';
import {Button, Container, Table, Icon} from 'semantic-ui-react';
import './PageViewAllProjects.css';

// Components
import JInput from '../components/JInput';

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

        <div>
          <Table celled >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>주제명</Table.HeaderCell>
                <Table.HeaderCell>라벨링 유형</Table.HeaderCell>
                <Table.HeaderCell>시작일</Table.HeaderCell>
                <Table.HeaderCell>마감일</Table.HeaderCell>
                <Table.HeaderCell>진행 상황</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.pageViewAllProjectsStore!.list.map((item: any) => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/labeling/${item.id}`}>
                        <div className='normalTitleTextStyle'>
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
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}

export default withRouter(PageViewAllProjects);
