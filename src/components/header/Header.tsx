import React from "react";
import { observer } from "mobx-react";

import Logo from "../logo/Logo";
import ToggleButton from "../navigation/toggle-button/ToggleButton";
import appStore from "../../store/AppStore";
import Search from "../search-combobox/SearchCombobox";
import NavigationList from "../navigation/navigation-list/NavigationList";
import NavigationSidebar from "../navigation/NavigationSidebar";

import "./Header.scss";

@observer
class Header extends React.Component {
  render() {
    return (
      <header className="cook-header">
        <ToggleButton />
        <Logo />
        {appStore.isMobileWidth ? (
          <NavigationSidebar />
        ) : (
          <>
            <Search />
            <NavigationList />
          </>
        )}
      </header>
    );
  }
}

export default Header;
