import {action, observable} from 'mobx';

export default class LabelingResult {
    // @observable labelingSubject: any = '';
    @observable all_user: any = [];
    @observable project_user: any = [];

    constructor() {
        this.all_user = [];
        this.project_user = [];
    }

    @action getAllUser = () => {
        this.all_user = [
            {
                '동네 뒷산': 4000
            }
        ]
    }
    @action getProjectUser = () => {

    }

    // @action getLabelingSubject = () => {
    //     this.labelingSubject = '광고 문자 필터링을 위한 Labeling';
    // }

}
