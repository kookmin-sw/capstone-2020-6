import {action, observable} from 'mobx';
import { client } from '../tsan';
import { gql } from 'apollo-boost';

export default class LabelingResultStore {
    @observable levelData: any = [];
    @observable labelingResult: any = [];
    @observable chartColors: any = [];
    @observable answers:any = [];

    constructor() {
        this.levelData = [];
        this.labelingResult = [];
    }

    @action getAnswerLabeler = (request:number) => {
        client.mutate({
            mutation: gql`
                mutation ($request: Int!, $token: String!){
                    getLabelResultOfLabeler(request: $request, token: $token) {
                        data
                    }
                }
            `,
            variables: {
                "request": request,
                "token": localStorage.token
            }
        })
        .then(({data}:any) => {
            this.answers = JSON.parse(data.getLabelResultOfLabeler.data)
            console.log(JSON.parse(data.getLabelResultOfLabeler.data))
        })
    }

    @action getAnswer = (request:number) => {
        client.mutate({
            mutation: gql`
                mutation ($request: Int!, $token: String!){
                    getLabelResultOfRequester(request: $request, token: $token) {
                        data
                    }
                }
            `,
            variables: {
                "request": request,
                "token": localStorage.token
            }
        })
        .then(({data}:any) => {
            this.answers = data.getLabelResultOfRequester.data
        })
        .catch(() => {})
    }

    @action getLevelData = () => {
        this.levelData = [
            {
                name: '동네 뒷산', All_user: 4000, Project_user: 2400,
            },
            {
                name: '지리산', All_user: 3000, Project_user: 1398,
            },
            {
                name: '한라산', All_user: 9800, Project_user: 2000,
            },
            {
                name: '에베레스트', All_user: 2780, Project_user: 3908,
            },
            {
                name: '티산', All_user: 4800, Project_user: 1980,
            }
        ]
    }

    @action getLabelingResult = () => {
        this.labelingResult = [
            { name: 'Dog\'s nose', value: 400 }, { name: 'Muffine', value: 300 },
            { name: 'None', value: 30 },
        ];
    }

    @action getChartColors = () => {
        this.chartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    }
}
