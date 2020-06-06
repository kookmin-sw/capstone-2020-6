import { action, observable } from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost'

export default class UserStore {
    @observable username: string = ""
    @observable isRequester: string = ""
    @observable email: string = ""
    @observable point: number = 0
    @observable phone: string = ""
    @observable paymentLog: any = [];
    constructor() {
        this.point = 0;
        this.getMyInfo();
        this.paymentLog = [];
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
    @action getPaymentLog = () => {
        client.query({
            query: gql`
                query GetMyPaymentlog($token: String!) {
                    getMyPaymentlog(token: $token) {
                        paymentlogs {
                            idx
                            type
                            note
                            logTime
                            amount
                            balance
                        }
                    }
                }
            `,
            variables: {
                token: localStorage.token,
            },
        })
            .then(({data}: any) => {
                var list: any = [];
                data.getMyPaymentlog.paymentlogs.forEach((item: any) => {
                    list.push({
                        id: item.idx,
                        type: item.type,
                        note: item.note,
                        logTime: item.logTime,
                        amount: item.amount,
                        balance: item.balance,
                    });
                });
                this.paymentLog = list;

            })
            .catch((e) => {
                console.log(e);
            });
    }
}
