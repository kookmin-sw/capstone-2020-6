import {action, observable} from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class LabelingImgCapStore {
    @observable imgList: any[];
    // @observable index: number = 0;
    @observable idx: number = -1;
    @observable activeButton: any = -1;
    @observable labelingSubject: any = '';
    @observable labelingText: string = "";
    @observable leftItems: number = 0;
    @observable data: string = "";
    @observable labelingItem: string = "";
    // @observable selectList: any[];

    constructor() {
        this.imgList = [];
        this.activeButton = -1;
        // this.index = 0;
        // this.selectList = [];
    }

    // @action setSelectList = (list:any[]) => {
    //     this.selectList = [...list]
    // }

    // @action getNum = () => {
    //     this.index += 1;
    // }
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
                left
                idx
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
          this.leftItems = data.getItem.left
          this.labelingItem = data.getItem.idx
        })
        .catch(e => {
          console.error(e)
          alert("라벨링 아이템을 가져오는데 에러가 발생하였습니다.")
        })
      }

    @action resetActiveButton = () => {
        this.activeButton = -1;
    }
}
