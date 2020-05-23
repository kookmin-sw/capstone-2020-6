import {action, observable} from 'mobx';

export default class LabelingResultStore {
    // @observable labelingSubject: any = '';
    @observable levelData: any = [];
    @observable labelingResult: any = [];

    constructor() {
        this.levelData = [];
        this.labelingResult = [];
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

}
