import React from "react";
import { observer } from "mobx-react";

import Logo from "../logo/Logo";
import NavButton from "../navigation/NavButton";

import "./Header.scss";

@observer
class Header extends React.Component {
  render() {
    return (
      <header className="cook-header">
        <NavButton />
        <Logo />
      </header>
    );
  }
}

export default Header;
