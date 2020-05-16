import {
  observable,
  action,
} from "mobx";
import { client } from "../tsan";
import { gql } from "apollo-boost";

export default class ProjectListStore {
  @observable listRun: any = [];
  @observable listEnd: any = [];
  constructor() {
    this.listRun = [];
    this.listEnd = [];
    this.getProjects("RUN");
    this.getProjects("END");
  }
  @action getProjects = (state:string) => {
    client.query({
      query: gql`
        query GetAllRequest{
          getAllRequest {
            message {
              status
              message
            }
            requests {
              idx
              user {
                fullname
              }
              category {
                idx
                type
                name
              }
              state
              subject
              description
              thumbnail
              onelineDescription
              startDate
              endDate
              currentCycle
              maxCycle
              totalPoint
              isCaptcha
              countDataset
            }
          }
        }
      `
    })
    .then(({data}:any) => {
      var list:any = []
      data.getAllRequest.requests.forEach((item:any) => {
        list.push({
          id: item.idx,
          thumbnail: item.thumbnail,
          title: item.subject,
          author: item.user ? item.user.fullname : "알 수 없음",
          start_date: item.startDate,
          end_date: item.endDate,
          type: item.category.type.toUpperCase() + "-" + item.category.name,
          point: item.totalPoint / item.maxCycle,
          description: item.onelineDescription,
          progress: item.currentCycle,
          all: item.maxCycle,
          progress_rate: item.currentCycle / item.maxCycle
        })
      });
      if(state === "RUN") {
        this.listRun = list
      } else if(state === "END") {
        this.listEnd = list
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
  @action getAvailableProject = () => {
    this.listRun = [
    ];
  }
}
