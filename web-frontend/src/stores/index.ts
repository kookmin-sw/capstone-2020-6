import NavigationStore from './NavigationStore';
import MenuStore from './MenuStore';
import ProjectListStore from './ProjectListStore';
import LoginStore from './loginStore';

export default {
  navigationStore: new NavigationStore(),
  menuStore: new MenuStore(),
  projectListStore: new ProjectListStore(),
  loginStore: new LoginStore()
};
