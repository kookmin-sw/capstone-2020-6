import Avatar from './Avatar';
import MenuStore from './MenuStore';
import ProjectListStore from './ProjectListStore';

export default {
  avatarStore: new Avatar(),
  menuStore: new MenuStore(),
  projectListStore: new ProjectListStore(),
};
