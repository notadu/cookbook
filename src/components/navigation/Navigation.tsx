import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";

import {
  RECIPES_DESSERTS_PAGE_URL,
  RECIPES_ITALIAN_CUISINE_PAGE_URL,
  RECIPES_SALADS_PAGE_URL,
  RECIPES_VEGETARIAN_DIET_PAGE_URL,
} from "../../constants/routes";
import menuStore from "../../store/MenuStore";
import "./Navigation.scss";

@observer
class Navigation extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (window.innerWidth >= 768) {
      menuStore.hideMenu();
    }
  };

  render() {
    return (
      <nav
        className={classNames(
          "cook-nav",
          menuStore.isMenuOpened && "cook-nav__opened"
        )}
      >
        <ul className="navigation-list">
          <li className="navigation-item">
            <NavLink to={RECIPES_SALADS_PAGE_URL}>Salads</NavLink>
          </li>
          <li className="navigation-item">
            <NavLink to={RECIPES_ITALIAN_CUISINE_PAGE_URL}>
              Italian cuisine
            </NavLink>
          </li>
          <li className="navigation-item">
            <NavLink to={RECIPES_VEGETARIAN_DIET_PAGE_URL}>
              Vegetarian diet
            </NavLink>
          </li>
          <li className="navigation-item">
            <NavLink to={RECIPES_DESSERTS_PAGE_URL}>Dessert</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
