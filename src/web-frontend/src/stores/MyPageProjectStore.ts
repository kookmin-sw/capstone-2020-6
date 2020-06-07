import {
    observable,
    action,
} from "mobx";
import { client } from "../tsan";
import { gql } from "apollo-boost";

export default class ProjectListStore {
    @observable list: any = [];
    @observable idx: string = '';
    @observable loading: boolean = false;

    constructor() {
        this.list = [];
        this.idx = '';
        this.loading = false;
    }

    /*       
        idx: ID!
        user: UserType
        category: CategoryType
        subject: String!
        description: String!
        thumbnail: String!
        onelineDescription: String!
        startDate: DateTime!
        endDate: DateTime!
        currentCycle: Int!
        maxCycle: Int!
        totalPoint: Int!
        isCaptcha: Boolean!
        dataset: DatasetType
        countDataset: Int!
        state: RequestState!
        labelingSet: [LabelingType!]!
        paymentlogSet: [PaymentLogType!]!
    */

    @action reward = () => {
        this.loading = true;
        client.mutate({
            mutation: gql`
                mutation Reward($idx: Int!, $token: String!) {
                    reward(idx: $idx, token: $token) {
                        message {
                            status
                            message
                        }
                    }
                }`,
            variables: {
                idx: parseInt(this.idx),
                token: localStorage.token
            }
        }).then(({data}: any) => {
            this.loading = false;
            window.location.reload();
            alert(data.reward.message.message);
        }).catch((e) => {
            this.loading = false;
            console.log(e);
        });
    }

    @action setId = (idx: string) => {
        this.idx = idx;
    }

    @action setStartReq = () => {
        this.loading = true;

        client.mutate({
            mutation: gql`
            mutation StartRequest($idx: Int!, $token: String!) {
                startRequest(idx: $idx, token: $token) {
                    message{
                        status
                        message
                    }
                }
            }`
            ,
            variables: {
                idx: parseInt(this.idx),
                token: localStorage.token,
            }
        }).then(({data}:any) => {
            this.loading = false;
            window.location.reload();
            alert(data.startRequest.message.message);
            }
        ).catch((e) => {
            this.loading = false;

            console.log(e);
        })
    }

    @action setEndReq = () => {
        this.loading = true;

        client.mutate({
            mutation: gql`
            mutation EndRequest($idx: Int!, $token: String!) {
                endRequest(idx: $idx, token: $token) {
                    message{
                        status
                        message
                    }
                }
            }`
            ,
            variables: {
                idx: parseInt(this.idx),
                token: localStorage.token
            }
        }).then(({data}:any) => {
            this.loading = false;
            window.location.reload();
            alert(data.endRequest.message.message);
            }
        ).catch(e=>{
            this.loading = false;

            console.log(e)
        })
    }

    @action setVerReq = () => {
        this.loading = true;
        client.mutate({
            mutation: gql`
            mutation VerifyRequest($idx: Int!, $token: String!) {
                verifyRequest(idx: $idx, token: $token) {
                    message{
                        status
                        message
                    }
                }
            }`
            ,
            variables: {
                idx: parseInt(this.idx),
                token: localStorage.token
            }
        }).then(({data}:any) => {
                this.loading = false;
                window.location.reload();
                alert(data.verifyRequest.message.message);
            }
        ).catch(e=>{
            this.loading = false;
            console.log(e)
        })
    }

    @action getProjects = () => {
        this.loading = true;

        client.query({
            query: gql`
                query GetMyRequest($token: String!) {
                        getMyRequest(token: $token) {
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
                              category{
                                idx
                                type
                                name
                              }
                              subject
                              startDate
                              endDate
                              state
                            }
                          }
                }
            `,
            variables: {
                token: localStorage.token
            }
        })
        .then(({data}:any) => {
            this.loading = false;

            var list:any = []
            var status:any = {
                'RED': "준비중",
                "RUN": "진행중",
                "END": "종료"
            }
            data.getMyRequest.requests.forEach((item:any) => {
                list.push({
                    id: item.idx,
                    title: item.subject,
                    author: item.user.fullname,
                    start_date: item.startDate,
                    end_date: item.endDate,
                    type: "[" + item.category.type + "] " + item.category.name,
                    status: status[item.state],
                })
            });
            this.list = list;
        })
        .catch(e => {
            this.loading = false;

            console.error(e);
        })
    }
}
