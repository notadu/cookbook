import React from "react";
import { observer } from "mobx-react";

import Logo from "../logo/Logo";
import MenuButton from "../menu/MenuButton";

import "./Header.scss";

@observer
class Header extends React.Component {
  render() {
    return (
      <header className="cook-header">
        <MenuButton />
        <Logo />
      </header>
    );
  }
}

export default Header;
