import { observable } from "mobx";

class NotificationStore {
  @observable notifications: Map<string, string> = new Map<string, string>();
}

export default new NotificationStore();
