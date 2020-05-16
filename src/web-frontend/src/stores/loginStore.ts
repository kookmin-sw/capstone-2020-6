import { action, observable } from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost';

export default class LoginStore {
  @observable username: string = '';
  @observable oldPassword: string = '';
  @observable password: string = '';
  @observable jwt: string = '';
  @observable is_login: boolean = false;
  @observable passwordCheck: string = '';
  constructor() {
    this.username = ''
    this.password = ''
    this.jwt = localStorage.token
    this.is_login = !!this.jwt
    this.passwordCheck = ''
    this.oldPassword = ''
  }
  @action setUsername = (event: any) => {
    this.username = event.target.value
  }
  @action setPassword = (event: any) => {
    this.password = event.target.value
  }
  @action setOldPassword = (event: any) => {
    this.oldPassword = event.target.value
  }
  @action setPasswordCheck = (event: any) => {
    this.passwordCheck = event.target.value
  }
  @action setJwt = (jwt: string) => {
    this.jwt = jwt
  }
  @action logout = () => {
    localStorage.clear()
    this.jwt = ''
    window.location.href = '/'
  }
  @action changePassword = () => {
    if(this.password !== this.passwordCheck) {
      alert("입력하신 두 패스워드가 서로 같지 않습니다.")
      return false
    }
    client.mutate({
      mutation: gql`
      mutation UpdatePassword($newPassword: String!, $oldPassword: String!, $token: String!) {
        updatePassword(newPassword: $newPassword, oldPassword: $oldPassword, token: $token) {
          message{
            status
            message
          }
        }
      }
      `,
      variables: {
        token: localStorage.token,
        oldPassword: this.oldPassword,
        newPassword: this.password
      }
    })
    .then(({data}:any) => {
      if(data.updatePassword.message.status) {
        alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.")
        localStorage.clear()
        this.jwt = ''
        window.location.href = "/"
      } else {
        alert(data.updatePassword.message.message)
      }
    })
    .catch(e => console.error)
  }

  @action login = () => {
    return client.mutate({
      mutation: gql`
        mutation($username: String!, $password: String!) {
          loginAccount(username: $username, password: $password) {
            message {
              status
              message
            }
            jwt
          }
        }
      `,
      variables: {
        username: this.username,
        password: this.password
      }
    })
  }
}
