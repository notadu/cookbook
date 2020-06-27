import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import { reaction } from "mobx";
import { CSSTransition } from "react-transition-group";

import NavigationList from "./navigation-list/NavigationList";
import Search from "../search-combobox/SearchCombobox";
import navigationStore from "../../store/NavigationStore";
import appStore from "../../store/AppStore";
import { ESCAPE_KEY } from "../../constants/common";

import "./NavigationSidebar.scss";

@observer
class NavigationSidebar extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
    reaction(
      () => navigationStore.isMobileNavOpened,
      (isMobileNavOpened: boolean) => this.toggleBodyOverflow(isMobileNavOpened)
    );
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    navigationStore.closeMobileNav();
  }

  handleKeyDown = (e: any) => {
    const isNestedInputFocused =
      document.activeElement?.className === "search_input";
    if (
      navigationStore.isMobileNavOpened &&
      e.key === ESCAPE_KEY &&
      !isNestedInputFocused
    ) {
      navigationStore.closeMobileNav();
    }
  };

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    if (
      navigationStore.isMobileNavOpened &&
      (prevProps.location.pathname !== this.props.location.pathname ||
        prevProps.location.search !== this.props.location.search)
    ) {
      navigationStore.closeMobileNav();
    }
  }

  toggleBodyOverflow = (hideOverflow: boolean) => {
    const isScrollPresent = document.body.scrollHeight - window.innerHeight;
    if (!appStore.isTouchDevice && isScrollPresent) {
      document.body.style.paddingRight = hideOverflow ? "17px" : "";
    }
    document.body.style.overflow = hideOverflow ? "hidden" : "";
  };

  handleClose = () => {
    navigationStore.closeMobileNav();
  };

  render() {
    return (
      <>
        <CSSTransition
          timeout={500}
          in={navigationStore.isMobileNavOpened}
          classNames="slide-left"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="navigation-sidebar">
            <button
              aria-label="close mobile navigation"
              className="navigation-sidebar_close-button"
              value="close mobile navigation"
              onClick={this.handleClose}
            >
              &times;
            </button>
            <Search />
            <NavigationList />
          </div>
        </CSSTransition>
        <CSSTransition
          timeout={500}
          classNames="fade"
          in={navigationStore.isMobileNavOpened}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div
            className="navigation-sidebar_overlay"
            onClick={this.handleClose}
          />
        </CSSTransition>
      </>
    );
  }
}

export default withRouter(NavigationSidebar);
