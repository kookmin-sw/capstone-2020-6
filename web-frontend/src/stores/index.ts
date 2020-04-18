import NavigationStore from './NavigationStore';
import MenuStore from './MenuStore';
import ProjectListStore from './ProjectListStore';
import LoginStore from './loginStore';
import LabelingTextButtonStore from './LabelingTextButtonStore';
import LabelingPageStore from './LabelingPageStore';

export default {
  navigationStore: new NavigationStore(),
  menuStore: new MenuStore(),
  projectListStore: new ProjectListStore(),
  loginStore: new LoginStore(),
  labelingTextButtonStore: new LabelingTextButtonStore(),
  labelingPageStore: new LabelingPageStore(),
};
