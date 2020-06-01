import { action, observable } from "mobx";

class MenuStore {
  @observable isMenuOpened = false;

  @action.bound
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  @action.bound
  hideMenu() {
    this.isMenuOpened = false;
  }
}

export default new MenuStore();
