import {
    observable,
    action
} from "mobx";

import { client } from '../tsan'
import { gql } from 'apollo-boost'

export default class LabelingRegisterStore {
    @observable datasets: any = []
    @observable dataset: string = ""

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

    constructor() {
        this.title = ""
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
        .then(({data}:any) => {
            let datasets:any = [
                {
                    value: -1,
                    text: "데이터셋을 직업 업로드하겠습니다."
                }
            ]
            data.getAllDataset.datasets.forEach((item:any) => {
              datasets.push({
                  value: item.idx,
                  text: item.name
              })  
            })
            this.datasets = datasets
        })
        .catch(e => {
            console.error(e)
            alert("데이터셋 목록을 불러오는데 실패하였습니다.")
        })
    }

    @action setDataset = (e:any, {value}:any) => {
        this.dataset = value
    }

    @action setTitle = (e:any) => {
        this.title = e.target.value 
    }

    @action setLabelingOption = (e:any) => {
        this.labelingOption = e.target.value
    }

    @action setOnelineDescription = (e:any) => {
        this.onelineDescription = e.target.value
    }

    @action setDetail = (e:any) => {
        this.detail = e.target.value
    }

    @action setReward = (e:any) => {
        var reward = "" + parseInt(e.target.value)
        if(reward == "NaN") {
            reward = "0"
        }
        this.reward = reward
    }

    @action setCycle = (e:any) => {
        var cycle = "" + parseInt(e.target.value)
        if(cycle == "NaN") {
            cycle = "0"
        }
        this.cycle = cycle
    }

    @action setCountDataset = (e:any) => {
        var countDataset = "" + parseInt(e.target.value)
        if(countDataset == "NaN") {
            countDataset = "0"
        }
        this.countDataset = countDataset
    }

    @action setStartDateYear = (e:any, {value}:any) => {
        this.startDateYear = value
    }

    @action setStartDateMonth = (e:any, {value}:any) => {
        this.startDateMonth = value
    }

    @action setStartDateDay = (e:any, {value}:any) => {
        this.startDateDay = value
    }

    @action setEndDateYear = (e:any, {value}:any) => {
        this.endDateYear = value
    }

    @action setEndDateMonth = (e:any, {value}:any) => {
        this.endDateMonth = value
    }

    @action setEndDateDay = (e:any, {value}:any) => {
        this.endDateDay = value
    }

    @action submit = () => {
        
    }
}
