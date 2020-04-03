import {action, observable} from 'mobx';

export default class Avatar {
    @observable thumbnail: any = '';
    constructor() {
      this.thumbnail = '';
    }
    @action getAvatar() {
      this.thumbnail = 'defaultAvatar.png';
    }
}
