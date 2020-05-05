import { action, observable } from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost';

export default class LoginStore {
  @observable fullname: string = '';
  @observable username: string = '';
  @observable password: string = '';
  @observable passwordCheck: string = '';
  @observable phone: string = '';
  @observable auth: string = '';
  @observable year: string = '';
  @observable month: string = '';
  @observable date: string = '';
  @observable email: string = '';
  @observable isRequester: string = '';

  constructor() {
    this.username = ''
    this.password = ''
  }

  @action setUsername = (event: any) => {
    this.username = event.target.value
  }

  @action setPassword = (event: any) => {
    this.password = event.target.value
  }

  @action setFullname = (event: any) => {
    this.fullname = event.target.value
  }

  @action setYear = (e:any, {value}:any) => {
    this.year = value
  }

  @action setMonth = (e:any, {value}:any) => {
      this.month = value
  }

  @action setDate = (e:any, {value}:any) => {
      this.date = value
  }

  @action setPasswordCheck = (event: any) => {
    this.passwordCheck = event.target.value
  }

  @action setEmail = (event: any) => {
    this.email = event.target.value
  }

  @action setPhone = (event: any) => {
    this.phone = event.target.value
  }

  @action setAuth = (event: any) => {
    this.auth = event.target.value
  }

  @action setIsRequester = (event: any, {checked}:any) => {
    this.isRequester = checked
  }
}
