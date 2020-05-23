import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './PageMain.css';

// Components
import CardProject from '../components/CardProject';
import Header from '../components/Header';

// for Mobx
import {observer, inject} from 'mobx-react';
import ProjectListStore from '../stores/ProjectListStore';

interface Props {
  projectListStore?: ProjectListStore;
}

@inject('projectListStore')
@observer
class App extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.props.projectListStore!.getProjects('RUN');
    this.props.projectListStore!.getProjects('END');
  }
  render() {
    return (
      <>
        <Header />
        <br />
        <Container style={{position: 'relative'}}>
          <div className='mainPageShowMore'>
            <h3>진행중인 라벨링 프로젝트</h3>
            <Link to='allProjects'>
              <div className='showMoreLink'>더보기</div>
            </Link>
          </div>
          <Grid columns={4}>
            {this.props.projectListStore!.listRun.map((item: any, key:any) => {
              return (
                <Grid.Column key={key}>
                  <CardProject
                    id={item.id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    author={item.author}
                    start_date={item.start_date}
                    end_date={item.end_date}
                    type={item.type}
                    point={item.point}
                    description={item.description}
                    progress={item.progress}
                    all={item.all}
                    progress_rate={item.progress_rate}
                    status={'main'}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
          <br/>
          <div className='mainPageShowMore'>
            <h3>완료된 라벨링 프로젝트</h3>
            <Link to='allProjectsFinished'>
              <div className='showMoreLink'>더보기</div>
            </Link>
          </div>
          <Grid columns={4}>
            {this.props.projectListStore!.listEnd.map((item: any, key:any) => {
              return (
                <Grid.Column key={key}>
                  <CardProject
                    id={item.id}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    author={item.author}
                    start_date={item.start_date}
                    end_date={item.end_date}
                    type={item.type}
                    point={item.point}
                    description={item.description}
                    progress={item.progress}
                    all={item.all}
                    progress_rate={item.progress_rate}
                    status={'main'}
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </Container>
      </>
    );
  }
}

export default App;
