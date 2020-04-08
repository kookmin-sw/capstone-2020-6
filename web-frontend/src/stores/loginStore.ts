import { action, observable } from 'mobx';
import { client } from '../tsan'
import { gql } from 'apollo-boost';

export default class LoginStore {
  @observable username: string = '';
  @observable password: string = '';
  @observable jwt: string = '';
  constructor() {
    this.username = ''
    this.password = ''
    this.jwt = localStorage.token
  }
  @action setUsername = (event: any) => {
    this.username = event.target.value
  }
  @action setPassword = (event: any) => {
    this.password = event.target.value
  }
  @action setJwt = (jwt: string) => {
    this.jwt = jwt
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
