import { observable, action, runInAction, computed, IObservableValue } from 'mobx'

export default class ProjectListStore {
    @observable list: any = []
    constructor() {
        this.list = []
    }
    @action getAvailableProject() {
        this.list = [
            {
                "thumbnail": "https://image.dongascience.com/Photo/2018/01/15159739972169[1].jpg",
                "title": "강아지 비문 데이터 라벨링"
            },
            {
                "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEejDh2cKhbSC28LHNkZ2-PEIiW3Jw06xa-n_Cq17NlvIurwVO",
                "title": "구름 데이터 라벨링"
            },
            {
                "thumbnail": "https://imagescdn.gettyimagesbank.com/500/16/933/891/0/504644388.jpg",
                "title": "암세포 판단을 위한 데이터 라벨링"
            },
            {
                "thumbnail": "https://pds.joins.com/news/component/htmlphoto_mmdata/201308/06/htm_201308061479a010a011.jpg",
                "title": "고흐 작품 판단"
            },
        ]
    }
}
