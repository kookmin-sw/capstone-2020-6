import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Container, Grid } from "semantic-ui-react"
import "./PageMain.css"

// Components
import CardProject from '../components/CardProject'

// for Mobx
import { observer, inject } from 'mobx-react'
import ProjectListStore from '../stores/ProjectListStore'

// interface Props extends RouteComponentProps<any>{
interface Props {
  // navigate: any,
  projectListStore?: ProjectListStore
}

@inject("projectListStore") @observer
class App extends React.Component<Props> {
  constructor(props:any) {
    super(props)
    // 답변 가능한 프로젝트 목록 요청
    this.props.projectListStore!.getAvailableProject()
  }
  render() {
    console.log(this.props.projectListStore!.list)
    return (
      <>
        <div className="main_body_image" style={{backgroundImage: "url('/body.jpg')"}}>
          <div>
            <span>T-SAN, 티끌모아 태산</span>
            <Container className="main_body_text">
              T-SAN은 Ex dolore veniam fugiat quis adipisicing esse sunt ea enim eu consectetur ea sunt ad. Qui deserunt fugiat id aliquip esse laboris irure in adipisicing occaecat sint est. Lorem exercitation duis adipisicing veniam ullamco minim nostrud. Amet sint cillum enim dolore consectetur veniam enim id consequat commodo commodo nostrud. Aliquip eiusmod elit dolor proident qui laboris sint amet ad reprehenderit nisi.
              Do irure sit cupidatat commodo ex dolor cupidatat et deserunt consequat non do magna aute. Cupidatat fugiat nisi consectetur consectetur tempor sint adipisicing voluptate nisi. Lorem eiusmod magna nostrud enim.
            </Container>
          </div>
        </div>
        <br/>

        <Container>
        <h3>진행중인 라벨링 프로젝트</h3>
        <Grid columns={3}>
          {
            this.props.projectListStore!.list.map((item: any) => {
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
                    progress_rate={item.progress_rate}
                  />
                </Grid.Column>
              )
            })
          }
        </Grid>
        <h3>완료된 라벨링 프로젝트</h3>
            <Grid columns={3}>
                {
                    this.props.projectListStore!.list.map((item: any) => {
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
                                    progress_rate={item.progress_rate}
                                />
                            </Grid.Column>
                        )
                    })
                }
            </Grid>

        </Container>
      </>
    )
  }
}

// export default withRouter(App);
export default App;
