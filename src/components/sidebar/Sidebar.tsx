import React from "react";
import { observer } from "mobx-react";

import Menu from "../menu/Menu";
import Search from "../search-combobox/SearchCombobox";

import "./Sidebar.scss";

@observer
class Sidebar extends React.Component {
  render() {
    return (
      <section className="cook-sidebar">
        <Search />
        <Menu />
      </section>
    );
  }
}

export default Sidebar;
