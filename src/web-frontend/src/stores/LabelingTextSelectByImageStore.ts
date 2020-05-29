import {action, observable} from 'mobx';
import {client} from '../tsan';
import {gql} from 'apollo-boost';

export default class LabelingTextSelectByImageStore {
    @observable idx: number = -1;
    @observable labelingSubject: any = '';
    @observable labelingText: string = '';
    @observable leftItems: number = 0;
    @observable data: string = '';
    @observable labelingItem: string = '';

    @action getRequest = () => {
      client.query({
        query: gql`
          query ($idx: Int!) {
            getIdxRequest(idx: $idx) {
              requests {
                subject
                onelineDescription
                keywords
              }
            }
          }
        `,
        variables: {
          idx: this.idx,
        },
      })
          .then(({ data }: any) => {
            this.labelingSubject = data.getIdxRequest.requests[0].subject;
            this.labelingText = data.getIdxRequest.requests[0].onelineDescription;
          })
          .catch(e => {
            console.error(e);
            alert('라벨링 정보를 가져오는데 에러가 발생하였습니다.');
          });
    }
}