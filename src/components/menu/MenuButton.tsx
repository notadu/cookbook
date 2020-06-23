import React from "react";
import { observer } from "mobx-react";

import menuStore from "../../store/SidebarStore";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

import "./MenuButton.scss";

@observer
class MenuButton extends React.Component {
  render() {
    return (
      <button
        aria-expanded={menuStore.isSidebarOpened}
        className="menu-button"
        onClick={menuStore.toggleSidebar}
      >
        <MenuIcon />
      </button>
    );
  }
}

export default MenuButton;
