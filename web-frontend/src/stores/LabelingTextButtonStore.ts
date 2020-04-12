import {action, observable} from 'mobx';

export default class LabelingTextButtonStore {
    @observable buttonList: any = [];
    constructor() {
      this.buttonList = [];
    }
    @action getButtons() {
      this.buttonList = [
        {
          category: '일반 광고',
        },
        {
          category: '선거 홍보',
        },
        {
          category: '사기 범죄',
        },
        {
          category: '개인 문자',
        },
        {
          category: '택배 안내',
        },
      ];
    }
}
