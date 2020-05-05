import {action, observable} from 'mobx';

export default class PointStore {
    @observable point: number = 0;
    constructor() {
      this.point = 0;
    }
    @action getPoint = () => {
        this.point += 10000
        alert("포인트 충전이 완료되었습니다")
    }
}
