import {action, observable} from 'mobx';

export default class LabelingTextButtonStore {
    @observable buttonList: any = [];
    @observable activeButton: any = -1;

    constructor() {
      this.buttonList = [];
      this.activeButton = -1;
    }

    @action setActiveButton = (id: any) => {
      this.activeButton = id
    }

    @action getButtons = () => {
      this.buttonList = [
        {
          id: 1,
          category: '일반 광고',
        },
        {
          id: 2,
          category: '선거 홍보',
        },
        {
          id: 3,
          category: '사기 범죄',
        },
        {
          id: 4,
          category: '개인 문자',
        },
        {
          id: 5,
          category: '택배 안내',
        },
      ];
    }
}
