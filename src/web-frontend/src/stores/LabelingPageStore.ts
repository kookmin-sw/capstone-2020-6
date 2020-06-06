import {action, observable} from 'mobx';
import {gql} from 'apollo-boost';
import {client} from '../tsan';

export default class LabelingPageStore {
  @observable request: any = {
    labelingSubject: '',
    thumbnailURL: '',
    author: '',
    startDate: '',
    endDate: '',
    labelingType: '',
    oneLineDescription: '',
    rewardPoints: '',
    detailDescription: '',
    progress: '',
    totalProgress: '',
    progressRate: '',
  }
  @observable loading: boolean = false;
  constructor() {
    this.loading = false;
  }

  @action getRequest = (postId: number) => {
    this.loading = true;
    client.query({
      query: gql`
        query GetIdxRequest($idx: Int!){
          getIdxRequest(idx:$idx) {
            message {
              status
              message
            }
            requests {
              state
              subject
              category {
                idx
                type
                name
              }
              description
              thumbnail
              onelineDescription
              startDate
              endDate
              currentCycle
              maxCycle
              totalPoint
              isCaptcha
              countDataset
              user {
                fullname
              }
            }
          }
        }
      `,
      variables: {
        idx: postId,
      },
    }).then(({data}:any) => {
      this.loading = false;
      const req = data.getIdxRequest.requests[0];
      this.request = {
        state: req.state,
        labelingSubject: req.subject,
        thumbnailURL: req.thumbnail,
        author: req.user ? req.user.fullname : '알 수 없음',
        startDate: req.startDate,
        endDate: req.endDate,
        labelingType: "[" + req.category.type.toUpperCase() + "] " + req.category.name,
        labelingTypeValue: req.category.idx,
        oneLineDescription: req.onelineDescription,
        rewardPoints: Math.floor(req.totalPoint / req.maxCycle),
        detailDescription: req.description,
        progress: req.currentCycle,
        totalProgress: req.maxCycle,
        progressRate: req.currentCycle / req.maxCycle * 100,
      };
    }).catch(e => {
      this.loading = false;
      console.error(e);
    });
  }
}
