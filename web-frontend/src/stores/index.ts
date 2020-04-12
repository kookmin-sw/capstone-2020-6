import NavigationStore from './NavigationStore';
import MenuStore from './MenuStore';
import ProjectListStore from './ProjectListStore';
import LoginStore from './loginStore';
import MyPageListStore from "./MyPageListStore";
import LabelingTextButtonStore from './LabelingTextButtonStore';

export default {
  navigationStore: new NavigationStore(),
  menuStore: new MenuStore(),
  projectListStore: new ProjectListStore(),
  loginStore: new LoginStore(),
  myPageListStore: new MyPageListStore(),
  labelingTextButtonStore: new LabelingTextButtonStore(),
};
