import React from "react";
import { observer } from "mobx-react";

import menuStore from "../../store/MenuStore";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

import "./MenuButton.scss";

@observer
class MenuButton extends React.Component {
  render() {
    return (
      <button className="menu-button" onClick={menuStore.toggleMenu}>
        <MenuIcon />
      </button>
    );
  }
}

export default MenuButton;
