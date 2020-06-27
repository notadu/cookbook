import { action, observable } from "mobx";

class NavigationStore {
  @observable isMobileNavOpened = false;

  @action
  toggleMobileNav() {
    this.isMobileNavOpened = !this.isMobileNavOpened;
  }

  @action
  closeMobileNav() {
    this.isMobileNavOpened = false;
  }
}

export default new NavigationStore();
