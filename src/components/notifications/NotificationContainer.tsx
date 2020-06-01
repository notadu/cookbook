import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import appStore from "../../store/AppStore";
import Notification from "./Notification";

import "./NotificationContainer.scss";

@observer
class NotificationContainer extends React.Component {
  @action
  handleClick = (key: string) => {
    appStore.errors.delete(key);
  };

  render() {
    return (
      <TransitionGroup className="notification-container">
        {Array.from(appStore.errors.keys()).map((key) => (
          <CSSTransition key={key} timeout={500} classNames="slide-fade">
            <Notification
              message={appStore.errors.get(key)}
              onClose={() => this.handleClick(key)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

export default NotificationContainer;
