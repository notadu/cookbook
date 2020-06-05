import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";

import Menu from "../menu/Menu";
import Search from "../autocomplete-search/AutocompleteSearch";
import sidebarStore from "../../store/SidebarStore";
import { MIN_TABLET_WIDTH } from "../../constants/common";

import "./Sidebar.scss";

@observer
class Sidebar extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.setSidebarVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setSidebarVisibility);
  }

  setSidebarVisibility = () => {
    if (sidebarStore.isSidebarHidden && window.innerWidth >= MIN_TABLET_WIDTH) {
      sidebarStore.isSidebarHidden = false;
    }
  };

  render() {
    return (
      <aside
        className={classNames(
          "cook-sidebar",
          sidebarStore.isSidebarHidden && "cook-sidebar__hidden"
        )}
      >
        <Search />
        <Menu />
      </aside>
    );
  }
}

export default Sidebar;