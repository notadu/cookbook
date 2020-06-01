import { observable } from "mobx";

class AppStore {
  @observable errors: Map<string, string> = new Map<string, string>();
  @observable isLoading = false;
}

export default new AppStore();
