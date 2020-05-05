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
  @observable isRequester: any = false;

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

  @action submit = () => {
    if(this.passwordCheck !== this.password) {
      alert("입력하신 두 패스워드가 서로 일치하지 않습니다.")
      return
    }
    client.mutate({
      mutation: gql`
        mutation CreateAccount(
          $birthday: String!,
          $email: String!,
          $fullname: String!,
          $isRequester: Boolean!,
          $isRobot: Boolean!,
          $password: String!,
          $phone: String!
          $username: String!
        ) {
          createAccount(
            username: $username,
            password: $password,
            phone: $phone,
            isRobot: $isRobot,
            isRequester: $isRequester,
            fullname: $fullname,
            email: $email,
            birthday: $birthday
          ) {
            message {
              status
              message
            }
          }
        }
      `,
      variables: {
        username: this.username,
        password: this.password,
        phone: this.phone,
        isRobot: false,
        isRequester: this.isRequester,
        fullname: this.fullname,
        email: this.email,
        birthday: this.year + "-" + this.month + "-" + this.date
      }
    })
    .then(({data}:any) => {
      alert(data.createAccount.message.message)
      if(data.createAccount.message.status) {
        window.location.href = "/login"
      }
    })
    .catch(e => {
      console.log(e)
    })
  }
}


// createAccount(
//   birthday: String
//   email: String
//   fullname: String
//   isRequester: Boolean
//   isRobot: Boolean
//   password: String
//   phone: String
//   username: String
//   ): CreateAccount
