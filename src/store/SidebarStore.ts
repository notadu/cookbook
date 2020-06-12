import { action, computed, observable } from "mobx";
import { TABLET_WIDTH } from "../constants/common";

class SidebarStore {
  @observable private _isSidebarHidden = true;

  constructor() {
    this._isSidebarHidden = window.innerWidth < TABLET_WIDTH;
  }

  @action.bound
  toggleSidebar() {
    this._isSidebarHidden = !this._isSidebarHidden;
  }

  @computed
  get isSidebarHidden() {
    return this._isSidebarHidden;
  }

  set isSidebarHidden(value: boolean) {
    this._isSidebarHidden = value;
  }
}

export default new SidebarStore();
