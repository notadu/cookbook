import React from "react";
import { observer } from "mobx-react";

import menuStore from "../../store/MenuStore";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

import "./NavButton.scss";

@observer
class NavButton extends React.Component {
  render() {
    return (
      <button className="navigation-button" onClick={menuStore.toggleMenu}>
        <MenuIcon />
      </button>
    );
  }
}

export default NavButton;
