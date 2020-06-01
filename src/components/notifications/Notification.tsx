import React from "react";

import "./Notification.scss";

interface INotificationProps {
  message?: string;
  onClose: () => void;
}

class Notification extends React.Component<INotificationProps> {
  timeout: NodeJS.Timeout | undefined;

  componentDidMount() {
    const { onClose } = this.props;

    this.timeout = setTimeout(onClose, 5000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { message, onClose } = this.props;
    return (
      <div className="notification">
        <span>{message || "Sorry, something went wrong"}</span>
        <button
          type="button"
          title="close"
          className="notification_button"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default Notification;
