import {
    observable,
    action,
} from "mobx";
import { client } from "../tsan";
import { gql } from "apollo-boost";

export default class ProjectListStore {
    @observable list: any = [];
    @observable idx: string = '';
    constructor() {
        this.list = [];
        this.idx = '';
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
                token: localStorage.token,
            },
        }).then(({data}: any) => {
            alert(data.reward.message.message);
        }).catch((e) => {
            console.log(e);
        });
    }

    @action setId = (idx: string) => {
        this.idx = idx;
    }

    @action setStartReq = () => {
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
            alert(data.startRequest.message.message);
            }
        ).catch((e) => {
            console.log(e);
        })
    }

    @action setEndReq = () => {
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
            alert(data.endRequest.message.message);
            }
        ).catch(e=>{
            console.log(e)
        })
    }


    @action getProjects = () => {
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
            console.error(e);
        })
    }
}
