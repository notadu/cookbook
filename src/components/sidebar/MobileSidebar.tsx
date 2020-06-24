import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { action, reaction, IReactionDisposer } from "mobx";
import { CSSTransition } from "react-transition-group";

import Menu from "../menu/Menu";
import Search from "../search-combobox/SearchCombobox";
import sidebarStore from "../../store/SidebarStore";
import appStore from "../../store/AppStore";

import "./MobileSidebar.scss";

@observer
class MobileSidebar extends React.Component<RouteComponentProps> {
  disposer: undefined | IReactionDisposer;

  constructor(props: RouteComponentProps) {
    super(props);
    this.disposer = reaction(
      () => sidebarStore.isMobileSidebarOpened,
      (isSidebarOpened: boolean) => this.toggleBodyOverflow(isSidebarOpened)
    );
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (
      sidebarStore.isMobileSidebarOpened &&
      (prevProps.location.pathname !== this.props.location.pathname ||
        prevProps.location.search !== this.props.location.search)
    ) {
      this.closeMobileSidebar();
    }
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer();
    }
  }

  toggleBodyOverflow = (isSidebarOpened: boolean) => {
    if (!appStore.isTouchDevice) {
      document.body.style.paddingRight = isSidebarOpened ? "17px" : "";
    }
    document.body.style.overflow = isSidebarOpened ? "hidden" : "";
  };

  @action
  closeMobileSidebar = () => {
    sidebarStore.isMobileSidebarOpened = false;
  };

  render() {
    return (
      <>
        <CSSTransition
          timeout={500}
          classNames="slide-left"
          in={sidebarStore.isMobileSidebarOpened}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <section className="cook-sidebar__mobile">
            <button
              aria-label="close main navigation"
              className="cook-sidebar_close-button"
              value="close sidebar"
              onClick={this.closeMobileSidebar}
            >
              &times;
            </button>
            <Search />
            <Menu />
          </section>
        </CSSTransition>
        <CSSTransition
          timeout={500}
          classNames="fade"
          in={sidebarStore.isMobileSidebarOpened}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div
            className="cook-sidebar_overlay"
            onClick={this.closeMobileSidebar}
          />
        </CSSTransition>
      </>
    );
  }
}

export default withRouter(MobileSidebar);
