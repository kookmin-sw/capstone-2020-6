import {
    observable,
    action,
} from "mobx";
import { client } from "../tsan";
import { gql } from "apollo-boost";

export default class ProjectListStore {
    @observable list: any = [];
    constructor() {
        this.list = [];
        this.getProjects()
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
            console.log(data)
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
                    start_date: new Date(item.startDate),
                    end_date: new Date(item.endDate),
                    type: "[" + item.category.type + "] " + item.category.name,
                    status: status[item.state],
                })
            });
            console.log(list)
            this.list = list
        })
        .catch(e => {
            console.error(e)
        })
    }
    @action getAvailableProject = () => {
        this.list = [
            {
                id: '1',
                title: "강아지 비문 데이터 라벨링",
                author: "윤여환",
                start_date: new Date(),
                end_date: new Date(new Date().setDate(30)),
                type: '이미지',
                status: '완료',
            },
            {
                id: '2',
                title: "구름 데이터 라벨링",
                author: "국민대학교",
                start_date: new Date(),
                end_date: new Date(new Date().setUTCMinutes(59, 59)),
                type: '이미지',
                status: '진행중',
            },
            {
                id: '3',
                title: "암세포 판단을 위한 데이터 라벨링",
                author: "국민건강보험",
                start_date: "2020.01.01",
                end_date: "2020.05.05",
                type: '텍스트',
                status: '진행전'
            },
            {
                id: '4',
                title: "고흐 작품 판단",
                author: "익명",
                start_date: "2020.01.01",
                end_date: "2020.05.05",
                type: '이미지',
                status: '진행중'
            }
        ];
    }
}
