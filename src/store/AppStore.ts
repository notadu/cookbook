import { observable } from "mobx";

class AppStore {
  @observable isLoading = false;
}

export default new AppStore();
