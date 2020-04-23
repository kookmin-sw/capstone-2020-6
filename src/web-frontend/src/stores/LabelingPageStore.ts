import {action, observable} from 'mobx';

export default class LabelingPageStore {
    @observable labelingSubject: string = '';
    @observable thumbnailURL: string = '';
    @observable author: string = '';
    @observable startDate: any = '';
    @observable endDate: any = '';
    @observable labelingType: string = '';
    @observable oneLineDescription: string = '';
    @observable rewardPoints: number = 0;
    @observable detailDescription: string = '';
    @observable progress: string = '';
    @observable totalProgress: string = '';
    @observable progressRate: string = '';

    constructor() {
      this.labelingSubject = '';
      this.thumbnailURL = '';
      this.author = '';
      this.startDate = '';
      this.endDate = '';
      this.labelingType = '';
      this.oneLineDescription = '';
      this.rewardPoints = 0;
      this.detailDescription = '';
      this.progress = '';
      this.totalProgress = '';
      this.progressRate = '';
    }

    @action getLabelingSubject = () => {
      this.labelingSubject = '강아지 이미지 데이터를 통한 이미지 학습 모델 구현';
    }

    @action getThumbnailURL = () => {
      this.thumbnailURL = 'http://www.v3wall.com/wallpaper/1920_1080/1001/1920_1080_20100126125400313419.jpg';
    }

    @action getAuthor = () => {
      this.author = '윤여환';
    }

    @action getStartDate = () => {
      this.startDate = new Date();
    }

    @action getEndDate = () => {
      this.endDate = new Date(new Date().setUTCMinutes(59, 59));
    }

    @action getLabelingType = () => {
      this.labelingType = 'imgSel';
    }

    @action getOneLineDescription = () => {
      this.oneLineDescription = '이 프로젝트를 통해 수집한 데이터로 강아지 이미지를 분류할 수 있습니다.';
    }

    @action getRewardPoints = () => {
      this.rewardPoints = 100;
    }

    @action getDetailDescroption = () => {
      this.detailDescription =
          '생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이, ' +
          '하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고, ' +
          '때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고 ,' +
          '위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서 ' +
          '품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에 ' +
          '천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고 ' +
          '밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게 ' +
          '보내는 무엇을 있는가?\n\n' +
          '생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이, ' +
          '하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고, ' +
          '때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고 ,' +
          '위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서 ' +
          '품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에 ' +
          '천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고 ' +
          '밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게 ' +
          '보내는 무엇을 있는가?\n\n' +
          '생생하며, 같은 바이며, 그리하였는가? 웅대한 그러므로 같이, ' +
          '하는 인생에 그들에게 것이다. 미묘한 미인을 가슴이 가치를 속잎나고, ' +
          '때문이다. 사랑의 인간의 아름답고 눈에 것이다. 기쁘며, 두기 뭇 피고 ,' +
          '위하여 같으며, 목숨을 우리의 것이다. 생명을 피어나기 인류의 설산에서 ' +
          '품고 일월과 노래하며 내려온 그것은 있다. 얼마나 그들은 같지 인간에 ' +
          '천자만홍이 우는 만물은 피고 있다. 이는 전인 얼음에 것은 크고 ' +
          '밝은 피부가 설산에서 위하여, 있는가? 이 청춘의 용기가 풍부하게 ' +
          '보내는 무엇을 있는가?';
    }

    @action getProgress = () => {
      this.progress = '65';
    }

    @action getTotalProgress = () => {
      this.totalProgress = '100';
    }

    @action getProgressRate = () => {
      this.progressRate = '65';
    }
}
