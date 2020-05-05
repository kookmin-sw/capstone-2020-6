import {
    observable,
    action
} from "mobx";

export default class LabelingRegisterStore {
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

    constructor() {
        this.title = ""
        this.labelingOption = ""
        this.onelineDescription = ""
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
}
