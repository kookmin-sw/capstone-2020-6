import { action, observable } from 'mobx';

export default class LoginStore {
  @observable username: string = '';
  @observable password: string = '';
  constructor() {
    this.username = '';
    this.password = '';
  }
  @action setUsername = (event: any) => {
    this.username = event.target.value
  }
  @action setPassword = (event: any) => {
    this.password = event.target.value
  }
}
