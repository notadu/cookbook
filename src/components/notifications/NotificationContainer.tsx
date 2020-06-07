import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import notificationStore from "../../store/NotificationStore";
import Notification from "./Notification";

import "./NotificationContainer.scss";

@observer
class NotificationContainer extends React.Component {
  @action
  handleClick = (key: string) => {
    notificationStore.notifications.delete(key);
  };

  render() {
    return (
      <TransitionGroup className="notification-container">
        {Array.from(notificationStore.notifications.keys()).map((key) => (
          <CSSTransition key={key} timeout={500} classNames="slide-fade">
            <Notification
              message={notificationStore.notifications.get(key)}
              onClose={() => this.handleClick(key)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

export default NotificationContainer;
