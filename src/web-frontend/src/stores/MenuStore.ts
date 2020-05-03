import {
  action,
  observable,
} from 'mobx';

export default class MenuStore {
    @observable active: string = 'main';
    constructor() {
      this.active = 'main';
    }
    @action setActive = (active: string) => {
      this.active = active;
    }
}
