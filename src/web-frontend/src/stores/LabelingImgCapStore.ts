import {action, observable} from 'mobx';

export default class LabelingImgCapStore {
    @observable imgList: any[];
    // @observable index: number = 0;
    @observable activeButton: any = -1;
    // @observable selectList: any[];

    constructor() {
        this.imgList = [];
        this.activeButton = -1;
        // this.index = 0;
        // this.selectList = [];
    }

    // @action setSelectList = (list:any[]) => {
    //     this.selectList = [...list]
    // }

    // @action getNum = () => {
    //     this.index += 1;
    // }

    @action resetActiveButton = () => {
        this.activeButton = -1;
    }

    @action getImgList = () => {
        this.imgList = [
            {
                idx: 0,
                img: "https://img.hankyung.com/photo/201912/AA.21304043.1.jpg",
            },
            {
                idx: 1,
                img: "https://img2.sbs.co.kr/img/seditor/VD/2016/03/24/VD80930785_w640.jpg",
            }
        ];
    }
}
