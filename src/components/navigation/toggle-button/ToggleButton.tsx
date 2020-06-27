import React from "react";
import { observer } from "mobx-react";

import navigationStore from "../../../store/NavigationStore";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menu.svg";

import "./ToggleButton.scss";

@observer
class ToggleButton extends React.Component {
  handleClick = () => {
    navigationStore.toggleMobileNav();
  };

  render() {
    return (
      <button
        aria-expanded={navigationStore.isMobileNavOpened}
        aria-label="Open main navigation"
        className="toggle-button"
        onClick={this.handleClick}
      >
        <MenuIcon />
      </button>
    );
  }
}

export default ToggleButton;
