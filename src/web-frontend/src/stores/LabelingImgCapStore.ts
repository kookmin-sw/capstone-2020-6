import { action, observable } from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class LabelingImgCapStore {
    @observable idx: number = -1;
    @observable labelingSubject: any = '';
    @observable labelingText: string = "";
    @observable leftItems: number = 0;
    @observable data: string = "";
    @observable labelingItem: string = "";

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
    @action submitLabel = (label: any, callback: any) => {
        client.mutate({
            mutation: gql`
            mutation ($request: Int!, $data: String!, $label: String!, $token: String!) {
              submitLabel(requestIdx:$request, data:$data, label:$label, token:$token) {
                message {
                  status
                  message
                }
              }
            }
          `,
            variables: {
                request: this.idx,
                data: this.labelingItem,
                label: JSON.stringify(label),
                token: localStorage.token
            }
        })
            .then(({ data }: any) => {
                callback()
            })
            .catch(e => {
                console.error(e)
                alert("제출에 문제가 생겼습니다.")
            })
    }

    @action setIdx = (idx: number) => {
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
        .then(({ data }: any) => {
            this.data = data.getItem.data
            this.leftItems = data.getItem.left
            this.labelingItem = data.getItem.idx
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
