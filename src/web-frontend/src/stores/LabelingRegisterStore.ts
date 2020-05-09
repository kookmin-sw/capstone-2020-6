import {
    observable,
    action
} from "mobx";

import { client } from '../tsan'
import { gql } from 'apollo-boost'

export default class LabelingRegisterStore {
    @observable datasets: any = []
    @observable dataset: string = ""
    @observable labelingOptions: any = []

    @observable title: string = "";
    @observable labelingOption: string = "";
    @observable onelineDescription: string = "";
    @observable detail: string = "";
    @observable reward: string = "";
    @observable cycle: string = "";
    @observable startDateYear: string = "";
    @observable startDateMonth: string = "";
    @observable startDateDay: string = "";
    @observable endDateYear: string = "";
    @observable endDateMonth: string = "";
    @observable endDateDay: string = "";
    @observable countDataset: string = "";
    @observable isCaptcha: boolean = false;
    @observable keywords: string = "";
    @observable image: string = "";

    constructor() {
        this.title = ""
        this.updateLabelingOptions()
        this.updateDataset()
    }

    updateLabelingOptions = () => {
        client.query({
            query: gql`
                query GetAllCategory($token: String!) {
                    getAllCategory(token: $token) {
                        message {
                            status
                            message
                        }
                        categorys {
                            idx
                            type
                            name
                        }
                    }
                }
            `,
            variables: {
                token: localStorage.token
            }
        })
            .then(({ data }: any) => {
                const labelingOptions: any = []
                data.getAllCategory.categorys.forEach((item: any) => {
                    labelingOptions.push({
                        value: item.idx,
                        text: "[" + item.type + "] " + item.name
                    })
                })
                this.labelingOptions = labelingOptions
            })
            .catch(e => {
                console.error(e)
            })
    }

    updateDataset = () => {
        client.query({
            query: gql`
                query GetAllDataset($token: String!) {
                    getAllDataset(token: $token) {
                        message {
                            status
                            message
                        }
                        datasets {
                            idx
                            name
                        }
                    }
                }
            `,
            variables: {
                token: localStorage.token
            }
        })
            .then(({ data }: any) => {
                let datasets: any = [
                    {
                        value: -1,
                        text: "데이터셋을 직업 업로드하겠습니다."
                    }
                ]
                data.getAllDataset.datasets.forEach((item: any) => {
                    datasets.push({
                        value: item.idx,
                        text: item.name
                    })
                })
                this.datasets = datasets
            })
            .catch(e => {
                console.error(e)
            })
    }

    @action setDataset = (e: any, { value }: any) => {
        this.dataset = value
    }

    @action setTitle = (e: any) => {
        this.title = e.target.value
    }

    @action setLabelingOption = (e: any, { value }: any) => {
        this.labelingOption = value
    }

    @action setOnelineDescription = (e: any) => {
        this.onelineDescription = e.target.value
    }

    @action setDetail = (e: any) => {
        this.detail = e.target.value
    }

    @action setReward = (e: any) => {
        var reward = "" + parseInt(e.target.value)
        if (reward == "NaN") {
            reward = "0"
        }
        this.reward = reward
    }

    @action setCycle = (e: any) => {
        var cycle = "" + parseInt(e.target.value)
        if (cycle == "NaN") {
            cycle = "0"
        }
        this.cycle = cycle
    }

    @action setCountDataset = (e: any) => {
        var countDataset = "" + parseInt(e.target.value)
        if (countDataset == "NaN") {
            countDataset = "0"
        }
        this.countDataset = countDataset
    }

    @action setStartDateYear = (e: any, { value }: any) => {
        this.startDateYear = value
    }

    @action setStartDateMonth = (e: any, { value }: any) => {
        this.startDateMonth = value
    }

    @action setStartDateDay = (e: any, { value }: any) => {
        this.startDateDay = value
    }

    @action setEndDateYear = (e: any, { value }: any) => {
        this.endDateYear = value
    }

    @action setEndDateMonth = (e: any, { value }: any) => {
        this.endDateMonth = value
    }

    @action setEndDateDay = (e: any, { value }: any) => {
        this.endDateDay = value
    }

    @action setKeywords = (e:any) => {
        this.keywords = e.target.value
    }

    @action setImage = (link:string) => {
        this.image = link
    }

    @action submit = () => {
        client.mutate({
            mutation: gql`
              mutation CreateRequest(
                $token: String!,
                $category: String!,
                $subject: String!,
                $description: String!,
                $onelineDescription: String!,
                $startDate: String!,
                $endDate: String!,
                $maxCycle: Int!,
                $totalPoint: Int!,
                $isCaptcha: Boolean!,
                $dataset: String!,
                $countDataset: Int!,
                $keywords: String!
              ) {
                createRequest(
                    token: $token,
                    category: $category,
                    subject: $subject,
                    description: $description,
                    onelineDescription: $onelineDescription,
                    startDate: $startDate,
                    endDate: $endDate,
                    maxCycle: $maxCycle,
                    totalPoint: $totalPoint,
                    isCaptcha: $isCaptcha,
                    dataset: $dataset,
                    countDataset: $countDataset,
                    keywords: $keywords
                ) {
                  message {
                    status
                    message
                  }
                }
              }
            `,
            variables: {
                category: this.labelingOption,
                description: this.detail,
                onelineDescription: this.onelineDescription,
                startDate: this.startDateYear + "-" + this.startDateMonth + "-" + this.startDateDay,
                endDate: this.endDateYear + "-" + this.endDateMonth + "-" + this.endDateDay,
                isCaptcha: this.isCaptcha,
                maxCycle: this.cycle,
                subject: this.title,
                token: localStorage.token,
                dataset: this.dataset,
                countDataset: this.countDataset,
                totalPoint: this.reward,
                keywords: this.keywords
            }
        })
        .then(({ data }: any) => {
            alert(data.createRequest.message.message)
            if (data.createRequest.message.status) {
                window.location.href = "/mypage/projects"
            }
        })
        .catch(e => {
            console.log(e)
        })
    }
}
