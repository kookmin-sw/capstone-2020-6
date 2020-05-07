import {action, observable} from 'mobx';

export default class LabelingTextSelectStore {
    @observable buttonList: any = [];
    @observable activeButton: any = -1;
    @observable textLabelingContents: any = '';
    @observable labelingSubject: any = '';

    constructor() {
      this.buttonList = [];
      this.activeButton = -1;
      this.textLabelingContents = '';
      this.labelingSubject = '';
    }

    @action setActiveButton = (id: any) => {
      this.activeButton = id;
    }

    @action getLabelingSubject = () => {
      this.labelingSubject = '광고 문자 필터링을 위한 Labeling';
    }

    @action getTextLabelingContents = () => {
      this.textLabelingContents =
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

    @action getButtons = () => {
      this.buttonList = [
        {
          id: 1,
          category: '일반 광고',
        },
        {
          id: 2,
          category: '선거 홍보',
        },
        {
          id: 3,
          category: '사기 범죄',
        },
        {
          id: 4,
          category: '개인 문자',
        },
        {
          id: 5,
          category: '택배 안내',
        },
      ];
    }
}
