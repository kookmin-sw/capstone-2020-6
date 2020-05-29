import { action, observable } from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost'

export default class UserStore {
    @observable username: string = ""
    @observable isRequester: string = ""
    @observable email: string = ""
    @observable point: number = 0
    @observable phone: string = ""
    constructor() {
        this.point = 0;
        this.getMyInfo()
    }
    @action getMyInfo = () => {
        client.query({
            query: gql`
            query My($token: String!) {
                my(token: $token) {
                    username
                    isRequester
                    email
                    point
                    phone
                }
            }
        `,
            variables: {
                token: localStorage.token
            }
        })
        .then(({ data }: any) => {
            this.username = data.my.username
            this.isRequester = data.my.isRequester
            this.email = data.my.email
            this.point = data.my.point
            this.phone = data.my.phone
        })
        .catch(e => {
            console.error(e)
        })
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
            .then(({ data }: any) => {
                alert(data.addPoint.message.message)
                this.point = data.addPoint.point
            })
            .catch(e => {
                alert("포인트 충전에 실패하였습니다.")
            })
    }
}
