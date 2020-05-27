import {
  observable,
  action,
} from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class ProjectListStore {
  @observable listRun: any = [];
  @observable listEnd: any = [];
  @observable searchList: any = [];
  @observable searchKeyword: string = '';
  @observable loading: boolean = false;
  constructor() {
    this.listRun = [];
    this.listEnd = [];
    this.searchList = [];
    this.searchKeyword = '';
    this.loading = false;
  }
  @action getSearchKeyword = () => {
    this.searchKeyword = '';
  };
  @action setSearchKeyword = (event: any) => {
    this.searchKeyword = event.target.value;
  };
  @action getProjects = (state: string) => {
    this.loading = true;
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
              thumbnail
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
      .then(({ data }: any) => {
        this.loading = false;
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
          this.searchList = list;
        } else if (state === 'END') {
          this.searchList = list;
        }
      })
      .catch((e) => {
        this.loading = false;
        console.error(e);
      });
  }
  @action getProjectsWithLimit = (state: string) => {
    client.query({
      query: gql`
        query GetStateRequest($projectState: String!, $offset: Int!, $limit: Int!) {
          getStateRequest(state: $projectState, offset: $offset, limit: $limit) {
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
              thumbnail
              subject
              onelineDescription
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
        offset: 0,
        limit: 4,
      },
    })
      .then(({ data }: any) => {
        var list: any = [];
        data.getStateRequest.requests.forEach((item: any) => {
          list.push({
            id: item.idx,
            thumbnail: item.thumbnail,
            title: item.subject,
            author: item.user.username ? item.user.username : '알 수 없음',
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
          this.listRun = list;
        } else if (state === 'END') {
          this.listEnd = list;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }
  @action searchProjectsRun = () => {
    this.loading = true;
    client.query({
      query: gql`
        query GetSubjectRunningRequest($keyword: String!) {
          getSubjectRunningRequest(keyword: $keyword) {
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
    .then(({ data }: any) => {
      this.loading = false;
      var list: any = [];
      data.getSubjectRunningRequest.requests.forEach((item: any) => {
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
      this.searchKeyword = '';
    })
    .catch((e) => {
      this.loading = false;
      console.error(e);
    });
  }
  @action searchProjectsEnd = () => {
    this.loading = true;
    client.query({
      query: gql`
        query GetSubjectEndRequest($keyword: String!) {
          getSubjectEndRequest(keyword: $keyword) {
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
        .then(({ data }: any) => {
          this.loading = false;
          var list: any = [];
          data.getSubjectEndRequest.requests.forEach((item: any) => {
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
            this.searchList = this.listEnd;
          } else {
            this.searchList = list;
          }
          this.searchKeyword = '';
        })
        .catch((e) => {
          this.loading = false;
          console.error(e);
        });
  }
}


