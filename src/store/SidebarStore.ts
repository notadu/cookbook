import { action, observable } from "mobx";

class SidebarStore {
  @observable isSidebarOpened = false;

  @action.bound
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }
}

export default new SidebarStore();
