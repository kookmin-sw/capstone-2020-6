import {
  observable,
  action,
} from 'mobx';
import {client} from '../tsan';
import {gql} from 'apollo-boost';

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
  }
  @action getSearchKeyword = () => {
    this.searchKeyword = '';
  };
  @action setSearchKeyword = (event: any) => {
    this.searchKeyword = event.target.value;
  };
  @action getProjects = (state: string) => {
    client.query({
      query: gql`
        query GetStateRequest($projectState: String!) {
          getStateRequest(state: $projectState) {
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
        projectState: state,
      },
    })
        .then(({data}: any) => {
          var list: any = [];
          data.getStateRequest.requests.forEach((item: any) => {
            list.push({
              id: item.idx,
              thumbnail: item.thumbnail,
              title: item.subject,
              author: item.user ? item.user.fullname : '알 수 없음',
              start_date: item.startDate,
              end_date: item.endDate,
              type: item.category.type.toUpperCase() + '-' + item.category.name,
              point: Math.floor(item.totalPoint / item.maxCycle),
              description: item.onelineDescription,
              progress: item.currentCycle,
              all: item.maxCycle,
              progress_rate: item.currentCycle / item.maxCycle,
            });
          });
          if (state === 'RUN') {
            console.log(1);
            this.listRun = list;
          } else if (state === 'END') {
            console.log(2);
            this.listEnd = list;
          }
        })
        .catch((e) => {
          console.error(e);
        });
  }
  @action searchProjects = (state: string) => {
    if (state === 'RUN') {
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
            console.log('test');
            if (this.searchKeyword === '') {
              this.searchList = this.listRun;
            } else {
              this.searchList = list;
            }
            // TODO: After fix search error.
            // this.searchKeyword = '';
          })
          .catch((e) => {
            console.error(e);
          });
    } else {
      console.log('state End');
    // TODO: Implement search finished projects query.
    }
  }
}
