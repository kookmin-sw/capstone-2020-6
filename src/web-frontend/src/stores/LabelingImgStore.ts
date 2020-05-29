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
    @observable isLoading: boolean = false;

    constructor() {
        this.imgList = [];
        this.selectList = [];
    }

    @action setIdx = (idx: number) => {
        this.idx = idx;
    }

    @action getRequest = () => {
        this.isLoading = true
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
                this.isLoading = false
                this.labelingSubject = data.getIdxRequest.requests[0].subject
                this.labelingText = data.getIdxRequest.requests[0].onelineDescription
            })
            .catch(e => {
                this.isLoading = false
                console.error(e)
                alert("라벨링 정보를 가져오는데 에러가 발생하였습니다.")
            })
    }

    @action setSelectList = (list:any[]) => {
        this.selectList = [...list]
    }

    @action submit = (items:any[]) => {
        const data:any = []
        const labels:any = []
        this.imgList.forEach((item:any) => {
            data.push(item.value)
            if(items.find(elem => elem == item.value)) {
                labels.push("1")
            } else {
                labels.push("0")
            }
        })
        this.submitLabel(labels, data, () => {
            this.selectList = []
            this.getItem()
        })
    }

    @action submitLabel = (labels: any, data: any, callback: any) => {
        this.isLoading = true
        client.mutate({
            mutation: gql`
            mutation ($request: Int!, $data: [String]!, $labels: [String]!, $token: String!) {
              submitLabels(requestIdx:$request, data:$data, labels:$labels, token:$token) {
                message {
                  status
                  message
                }
              }
            }
          `,
            variables: {
                request: this.idx,
                data: data,
                labels: labels,
                token: localStorage.token
            }
        })
        .then(({ data }: any) => {
            this.isLoading = false
            callback()
        })
        .catch(e => {
            this.isLoading = false
            console.error(e)
            alert("제출에 문제가 생겼습니다.")
        })
    }

    @action getItem = () => {
        this.isLoading = true
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
            this.isLoading = false
            const imgList = []
            for(let i=0;i<data.getItem.data.length;i++) {
                imgList.push({
                    image: data.getItem.data[i],
                    value: data.getItem.idx[i]
                })
            }
            this.imgList = imgList
            // this.imgList = data.getItem.data
            // this.labelingItem = data.getItem.idx
            this.leftItems = data.getItem.left
            if(data.getItem.left === -1) {
                alert("데이터 레이블링을 완료하였습니다.\n보상은 레이블링 의뢰 종료시에 일괄지급됩니다.")
                window.location.href = "/"
            }
        })
        .catch(e => {
            this.isLoading = false
            console.error(e)
            alert("라벨링 아이템을 가져오는데 에러가 발생하였습니다.")
        })
    }
}
