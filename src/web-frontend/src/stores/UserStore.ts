import {action, observable} from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost'

export default class UserStore {
    @observable point: number = 0;
    constructor() {
      this.point = 0;
    }
    @action getPoint = () => {
        client.mutate({
            mutation: gql`
                mutation AddPoint($token: String!) {
                    addPoint(token: $token) {
                        message {
                            status
                            message
                        }
                        point
                    }
                }
            `,
            variables: {
                token: localStorage.token
            }
        })
        .then(({data}:any) => {
            alert(data.addPoint.message.message)
            this.point = data.addPoint.point
        })
        .catch(e => {
            alert("포인트 충전에 실패하였습니다.")
        })
    }
}
