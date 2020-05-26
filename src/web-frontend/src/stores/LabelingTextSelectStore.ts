import {action, observable} from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class LabelingTextSelectStore {
    @observable idx: number = -1;
    @observable buttonList: any = [];
    @observable activeButton: any = -1;
    @observable data: string = "";
    @observable labelingSubject: any = '';
    @observable leftItems: number = 0;
    @observable labelingText: string = "";

    constructor() {
      this.buttonList = [];
      this.activeButton = -1;
      this.data = "";
      this.labelingSubject = '';
    }
    
    @action getKeywords = () => {
      client.query({
        query: gql`
          query ($idx: Int!){
            getKeywords(requestIdx: $idx) {
              name
            }
          }
        `,
        variables: {
          idx: this.idx
        }
      })
      .then(({data}:any) => {
        const btn: any = []
        data.getKeywords.forEach(({name}:any) => {
          btn.push({
            id: name,
            category: name
          })          
        });
        this.buttonList = btn;
      })
      .catch(e => {
        console.error(e)
        alert("키워드를 불러오는데 에러가 발생하였습니다.")
      })
    }

    @action getRequest = () => {
      client.query({
        query: gql`
          query ($idx: Int!) {
            getIdxRequest(idx: $idx) {
              requests {
                subject
                onelineDescription
                keywords
              }
            }
          }
        `,
        variables: {
          idx: this.idx
        }
      })
      .then(({data}:any) => {
          this.labelingSubject = data.getIdxRequest.requests[0].subject
          this.labelingText = data.getIdxRequest.requests[0].onelineDescription
      })
      .catch(e => {
        console.error(e)
        alert("라벨링 정보를 가져오는데 에러가 발생하였습니다.")
      })
    }

    @action setIdx = (idx:number) => {
      this.idx = idx;
    }

    @action getItem = () => {
      client.mutate({
        mutation: gql`
          mutation ($idx: Int!, $token: String!) {
            getItem(idx: $idx, token: $token) {
              message {
                status
                message
              }
              data
            }
          }
        `,
        variables: {
          idx: this.idx,
          token: localStorage.token
        }
      })
      .then(({data}:any) => {
        this.data = data.getItem.data
      })
      .catch(e => {
        console.error(e)
        alert("라벨링 아이템을 가져오는데 에러가 발생하였습니다.")
      })
    }

    @action resetActiveButton = () => {
      this.activeButton = -1;
    }

    @action setActiveButton = (id: any) => {
      this.activeButton = id;
    }

    @action getLabelingSubject = () => {
      this.labelingSubject = '광고 문자 필터링을 위한 Labeling';
    }

    @action getButtons = () => {
      this.buttonList = [
        {
          id: 1,
          category: '일반 광고',
        },
        {
          id: 2,
          category: '선거 홍보',
        },
        {
          id: 3,
          category: '사기 범죄',
        },
        {
          id: 4,
          category: '개인 문자',
        },
        {
          id: 5,
          category: '택배 안내',
        },
      ];
    }
}
