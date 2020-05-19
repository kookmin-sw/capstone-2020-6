import {
  observable,
  action,
} from 'mobx';
import {client} from '../tsan';
import {gql} from 'apollo-boost';
import {act} from 'react-dom/test-utils';

export default class ProjectListStore {
  @observable listRun: any = [];
  @observable listEnd: any = [];
  @observable searchList: any = [];
  @observable searchKeyword: string = '';
  constructor() {
    this.listRun = [];
    this.listEnd = [];
    this.searchList = [];
    this.searchKeyword = '';
    this.getProjects("RUN");
    this.getProjects("END");
  }
  @action getSearchKeyword = () => {
    this.searchKeyword = '';
  };
  @action setSearchKeyword = (event: any) => {
    this.searchKeyword = event.target.value;
  };
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
      `,
    })
        .then(({data}:any) => {
          var list:any = []
          data.getAllRequest.requests.forEach((item:any) => {
            list.push({
              id: item.idx,
              thumbnail: item.thumbnail,
              title: item.subject,
              author: item.user ? (item.user.fullname.length === 0 ? "익명" : item.user.fullname) : "알 수 없음",
              start_date: item.startDate,
              end_date: item.endDate,
              type: item.category.type.toUpperCase() + "-" + item.category.name,
              point: item.totalPoint / item.maxCycle,
              description: item.onelineDescription,
              progress: item.currentCycle,
              all: item.maxCycle,
              progress_rate: item.currentCycle / item.maxCycle
            });
          });
          if (state === 'RUN') {
            this.listRun = list;
          } else if (state === 'END') {
            this.listEnd = list;
          }
        })
        .catch(e => {
          console.error(e);
        });
  }
  // TODO: Delete this method.
  @action getAvailableProject = () => {
    this.listRun = [
    ];
  }
  @action searchProjects = () => {
    client.query({
      query: gql`
        query GetSubjectRequest($keyword: String!) {
          getSubjectRequest(keyword: $keyword) {
            message {
              status
              message
            }
            requests {
              idx
              user {
                id
                username
                password
                email
              }
            category {
              name
              type
            }
            subject
            description
            startDate
            endDate
            currentCycle
            maxCycle
            totalPoint
          }
        }
      }
    `,
      variables: {
        keyword: this.searchKeyword,
      },
    })
        .then(({data}: any) => {
          var list: any = [];
          data.getSubjectRequest.requests.forEach((item: any) => {
            list.push({
              id: item.idx,
              title: item.subject,
              type: item.category.type.toUpperCase() + '-' + item.category.name,
              start_date: item.startDate,
              end_date: item.endDate,
              progress: item.currentCycle,
              all: item.maxCycle,
              progress_rate: item.currentCycle / item.maxCycle,
            });
          });
          if (this.searchKeyword === '') {
            this.searchList = this.listRun;
          } else {
            this.searchList = list;
          }
          // TODO: After fix search error.
          // this.searchKeyword = '';
        })
        .catch(e => {
          console.error(e);
        });
  }
}
