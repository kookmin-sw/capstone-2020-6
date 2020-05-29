import {action, observable} from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class LabelingImgStore {
    @observable idx: number = -1;
    @observable labelingSubject: any = '';
    @observable labelingText: string = "";
    @observable leftItems: number = 0;
    @observable data: string = "";
    @observable labelingItem: any = [];
    @observable imgList: any = [];
    @observable selectList: any = [];

    constructor() {
        this.imgList = [];
        this.selectList = [];
    }

    @action setIdx = (idx: number) => {
        this.idx = idx;
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
            .then(({ data }: any) => {
                this.labelingSubject = data.getIdxRequest.requests[0].subject
                this.labelingText = data.getIdxRequest.requests[0].onelineDescription
            })
            .catch(e => {
                console.error(e)
                alert("라벨링 정보를 가져오는데 에러가 발생하였습니다.")
            })
    }

    @action setSelectList = (list:any[]) => {
        this.selectList = [...list]
    }

    @action getItem = () => {
        client.mutate({
            mutation: gql`
            mutation ($idx: Int!, $token: String!, $limit: Int!) {
              getItem(idx: $idx, token: $token, limit: $limit) {
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
                token: localStorage.token,
                limit: 9
            }
        })
        .then(({ data }: any) => {
            this.imgList = data.getItem.data
            this.labelingItem = data.getItem.idx
            this.leftItems = data.getItem.left
            if(data.getItem.left === -1) {
                alert("데이터 레이블링을 완료하였습니다.\n보상은 레이블링 의뢰 종료시에 일괄지급됩니다.")
                window.location.href = "/"
            }
        })
        .catch(e => {
            console.error(e)
            alert("라벨링 아이템을 가져오는데 에러가 발생하였습니다.")
        })
    }
}
