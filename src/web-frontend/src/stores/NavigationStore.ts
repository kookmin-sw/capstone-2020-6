import {action, observable} from 'mobx';

export default class NavigationStore {
    @observable thumbnail: string = '';
    @observable userId: string = '';
    constructor() {
      this.thumbnail = '';
      this.userId = '';
    }
    @action getAvatarThumbnail() {
      this.thumbnail = '/images/defaultAvatar.png';
    }
    @action getUserId() {
      this.userId = '1234';
    }
}
