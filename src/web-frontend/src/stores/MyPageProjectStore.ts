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
                console.log(data);
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
                console.log(data);
            }
        ).catch(e=>{
            console.log(e)
        })
    }


    @action getProjects = () => {
        client.query({
            query: gql`
                query GetRequesterRequest($token: String!) {
                    getRequesterRequest(token: $token) {
                        requests {
                            idx
                            user {
                                username
                                fullname
                            }
                            category {
                                idx
                                type
                                name
                            }
                            state
                            subject
                            description
                            thumbnail
                            onelineDescription
                            startDate
                            endDate
                            currentCycle
                            maxCycle
                            totalPoint
                            isCaptcha
                            countDataset
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
            data.getRequesterRequest.requests.forEach((item:any) => {
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
            this.list = list
        })
        .catch(e => {
            console.error(e)
        })
    }
}
