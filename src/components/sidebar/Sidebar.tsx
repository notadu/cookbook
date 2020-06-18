import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import classNames from "classnames";
import { action, reaction, IReactionDisposer } from "mobx";
import { CSSTransition } from "react-transition-group";

import Menu from "../menu/Menu";
import Search from "../search-combobox/SearchCombobox";
import sidebarStore from "../../store/SidebarStore";
import appStore from "../../store/AppStore";
import { TABLET_WIDTH } from "../../constants/common";

import "./Sidebar.scss";

@observer
class Sidebar extends React.Component<RouteComponentProps> {
  disposer: undefined | IReactionDisposer;

  constructor(props: RouteComponentProps) {
    super(props);
    this.disposer = reaction(
      () => sidebarStore.isSidebarOpened,
      (isSidebarOpened: boolean) => this.toggleBodyOverflow(isSidebarOpened)
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.setSidebarVisibility);
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (
      sidebarStore.isSidebarOpened &&
      (prevProps.location.pathname !== this.props.location.pathname ||
        prevProps.location.search !== this.props.location.search)
    ) {
      this.closeSidebar();
    }
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
    window.removeEventListener("resize", this.setSidebarVisibility);
  }

  toggleBodyOverflow = (isSidebarOpened: boolean) => {
    if (!appStore.isTouchDevice) {
      document.body.style.paddingRight = isSidebarOpened ? "17px" : "";
    }
    document.body.style.overflow = isSidebarOpened ? "hidden" : "";
  };

  setSidebarVisibility = () => {
    if (sidebarStore.isSidebarOpened && window.innerWidth >= TABLET_WIDTH) {
      this.closeSidebar();
    }
  };

  @action
  closeSidebar = () => {
    sidebarStore.isSidebarOpened = false;
  };

  render() {
    return (
      <>
        <aside
          className={classNames(
            "cook-sidebar",
            sidebarStore.isSidebarOpened && "cook-sidebar__opened"
          )}
        >
          <button
            className="cook-sidebar_close-button"
            value="close sidebar"
            onClick={this.closeSidebar}
          >
            &times;
          </button>
          <Search />
          <Menu />
        </aside>
        <CSSTransition
          timeout={500}
          classNames="fade"
          in={sidebarStore.isSidebarOpened}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="cook-sidebar_overlay" onClick={this.closeSidebar} />
        </CSSTransition>
      </>
    );
  }
}

export default withRouter(Sidebar);
