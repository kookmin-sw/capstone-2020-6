import {
  observable,
  action,
} from "mobx";
import { client } from "../tsan";
import { gql } from "apollo-boost";

export default class ProjectListStore {
  @observable listRun: any = [];
  @observable listEnd: any = [];
  constructor() {
    this.listRun = [];
    this.listEnd = [];
    this.getProjects("RUN");
    this.getProjects("END");
  }
  @action getProjects = (state:string) => {
    console.log(">>>>>>>>>>>>>>>>")
    client.query({
      query: gql`
        query GetAllRequest($token: String!){
          getAllRequest(token: $token) {
            message {
              status
              message
            }
            requests {
              idx
              user {
                fullname
              }
              category {
                idx
                type
                name
              }
              state
              subject
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
            }
          }
        }
      `,
      variables: {
        token: localStorage.token
      }
    })
    .then(({data}:any) => {
      console.log(">>>>>>>>>>>>>>2>>")
      var list:any = []
      data.getAllRequest.requests.forEach((item:any) => {
        list.push({
          id: item.idx,
          thumbnail: item.thumbnail,
          title: item.subject,
          author: item.user ? item.user.fullname : "알 수 없음",
          start_date: item.startDate,
          end_date: item.endDate,
          type: item.category.type.toUpperCase() + "-" + item.category.name,
          point: item.totalPoint / item.maxCycle,
          description: item.onelineDescription,
          progress: item.currentCycle,
          all: item.maxCycle,
          progress_rate: item.currentCycle / item.maxCycle
        })
      });
      if(state == "RUN") {
        this.listRun = list
      } else if(state == "END") {
        this.listEnd = list
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
  @action getAvailableProject = () => {
    this.listRun = [
      {
        id: '1',
        thumbnail:
          "http://www.v3wall.com/wallpaper/1920_1080/1001/1920_1080_20100126125400313419.jpg",
        title: "강아지 비문 데이터 라벨링",
        author: "윤여환",
        start_date: new Date(),
        end_date: new Date(new Date().setDate(30)),
        type: "이미지",
        point: "100",
        description: "강아지 사진을 선택해주세요!",
        progress: "65",
        all: "100",
        progress_rate: "65"
      },
      {
        id: '2',
        thumbnail:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEejDh2cKhbSC28LHNkZ2-PEIiW3Jw06xa-n_Cq17NlvIurwVO",
        title: "구름 데이터 라벨링",
        author: "국민대학교",
        start_date: new Date(),
        end_date: new Date(new Date().setUTCMinutes(59, 59)),
        type: "이미지",
        point: "200",
        description: "꽃 피고 새우는 봄날의 천지는 얼마나 기쁘며 얼마나 이쁠까?",
        progress: "70",
        all: "1000",
        progress_rate: "7"
      },
      {
        id: '3',
        thumbnail:
          "https://imagescdn.gettyimagesbank.com/500/16/933/891/0/504644388.jpg",
        title: "암세포 판단을 위한 데이터 라벨링",
        author: "국민건강보험",
        start_date: "2020.01.01",
        end_date: "2020.05.05",
        type: "이미지",
        point: "150",
        description: "꽃 피고 새우는 봄날의 천지는 얼마나 기쁘며 얼마나 이쁠까?",
        progress: "0",
        all: "1009",
        progress_rate: "0"
      },
      {
        id: '4',
        thumbnail:
          "https://pds.joins.com/news/component/htmlphoto_mmdata/201308/06/htm_201308061479a010a011.jpg",
        title: "고흐 작품 판단",
        author: "익명",
        start_date: "2020.01.01",
        end_date: "2020.05.05",
        type: "이미지",
        point: "100",
        description: "꽃 피고 새우는 봄날의 천지는 얼마나 기쁘며 얼마나 이쁠까?",
        progress: "709",
        all: "10000",
        progress_rate: "7.09"
      }
    ];
  }
}
