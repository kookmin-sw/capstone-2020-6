import {
    observable,
    action,
} from "mobx";

export default class ProjectListStore {
    @observable list: any = [];
    constructor() {
        this.list = [];
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
