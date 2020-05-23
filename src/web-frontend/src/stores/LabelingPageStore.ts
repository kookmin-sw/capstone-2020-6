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

  // constructor() {
    // this.request = {
    //   labelingSubject: "",
    //   thumbnailURL: "",
    //   author: "",
    //   startDate: "",
    //   endDate: "",
    //   labelingType: "",
    //   oneLineDescription: "",
    //   rewardPoints: "",
    //   detailDescription: "",
    //   progress: "",
    //   totalProgress: "",
    //   progressRate: ""
    // }
  // }

  @action getRequest = (postId: number) => {
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
      const req = data.getIdxRequest.requests[0];
      const authorTmp = req.user.fullname == null ? '' : req.user.fullname;
      this.request = {
        labelingSubject: req.subject,
        thumbnailURL: req.thumbnail,
        author: authorTmp,
        startDate: req.startDate,
        endDate: req.endDate,
        labelingType: '[' + req.category.type.toUpperCase() + '] ' + req.category.name,
        oneLineDescription: req.onelineDescription,
        rewardPoints: Math.floor(req.totalPoint / req.maxCycle),
        detailDescription: req.description,
        progress: req.cycle,
        totalProgress: req.maxCycle,
        progressRate: req.cycle / req.maxCycle
      };
    }).catch(e => {
      console.error(e);
    });
  }
}
