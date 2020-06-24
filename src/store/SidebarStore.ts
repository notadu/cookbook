import { action, observable } from "mobx";

class SidebarStore {
  @observable isMobileSidebarOpened = false;

  @action.bound
  toggleSidebar() {
    this.isMobileSidebarOpened = !this.isMobileSidebarOpened;
  }
}

export default new SidebarStore();
