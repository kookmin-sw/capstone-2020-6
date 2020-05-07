import NavigationStore from './NavigationStore';
import MenuStore from './MenuStore';
import ProjectListStore from './ProjectListStore';
import LoginStore from './loginStore';
import LabelingTextSelectStore from './LabelingTextSelectStore';
import LabelingImgStore from './LabelingImgStore';
import LabelingPageStore from './LabelingPageStore';
import MyPageListStore from './MyPageListStore';
import LabelingPageTextWrite from './LabelingTextWriteStore';
import MyPageProjectStore from './MyPageProjectStore';
import LabelingRegisterStore from './LabelingRegisterStore';
import UserStore from './UserStore';
import RegisterStore from './RegisterStore';

export default {
  navigationStore: new NavigationStore(),
  menuStore: new MenuStore(),
  projectListStore: new ProjectListStore(),
  loginStore: new LoginStore(),
  labelingTextButtonStore: new LabelingTextSelectStore(),
  labelingImgStore: new LabelingImgStore(),
  labelingPageStore: new LabelingPageStore(),
  myPageListStore: new MyPageListStore(),
  labelingTextWriteStore: new LabelingPageTextWrite(),
  myPageProjectStore: new MyPageProjectStore(),
  labelingRegisterStore: new LabelingRegisterStore(),
  userStore: new UserStore(),
  registerStore: new RegisterStore()
};
