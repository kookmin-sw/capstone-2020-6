import {action, observable} from 'mobx';

export default class Avatar {
    @observable thumbnail: string = '../../img/defaultAvatar.png';
    constructor() {
      this.thumbnail = '../../img/defaultAvatar.png';
    }
    @action getAvatar() {
      this.thumbnail = '../../img/defaultAvatar.png';
    }
}
