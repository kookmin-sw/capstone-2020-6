import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Container, Grid } from "semantic-ui-react";
import "./PageMain.css";

// Components
import CardProject from "../components/CardProject";
import Header from "../components/Header";

// for Mobx
import { observer, inject } from "mobx-react";
import ProjectListStore from "../stores/ProjectListStore";

// interface Props extends RouteComponentProps<any>{
interface Props {
  // navigate: any,
  projectListStore?: ProjectListStore;
}

@inject("projectListStore")
@observer
class App extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    // 답변 가능한 프로젝트 목록 요청
    this.props.projectListStore!.getAvailableProject();
  }
  render() {
    console.log(this.props.projectListStore!.list);
    return (
      <>
        <Header />
        <br />
        <Container style={{ position: "relative" }}>
          <h3>진행중인 라벨링 프로젝트</h3>
          <Grid columns={3}>
            {this.props.projectListStore!.list.map((item: any) => {
              return (
                <Grid.Column>
                  <CardProject
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
                  />
                </Grid.Column>
              );
            })}
          </Grid>
          <h3>완료된 라벨링 프로젝트</h3>
          <Grid columns={3}>
            {this.props.projectListStore!.list.map((item: any) => {
              return (
                <Grid.Column>
                  <CardProject
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

// export default withRouter(App);
export default App;
