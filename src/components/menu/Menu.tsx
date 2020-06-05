import React from "react";
import { NavLink } from "react-router-dom";

import {
  RECIPES_DESSERTS_PAGE_URL,
  RECIPES_ITALIAN_CUISINE_PAGE_URL,
  RECIPES_SALADS_PAGE_URL,
  RECIPES_VEGETARIAN_DIET_PAGE_URL,
} from "../../constants/routes";

import "./Menu.scss";

const Menu = () => (
  <nav>
    <ul className="menu-list">
      <li className="menu-item">
        <NavLink to={RECIPES_SALADS_PAGE_URL}>Salads</NavLink>
      </li>
      <li className="menu-item">
        <NavLink to={RECIPES_ITALIAN_CUISINE_PAGE_URL}>Italian cuisine</NavLink>
      </li>
      <li className="menu-item">
        <NavLink to={RECIPES_VEGETARIAN_DIET_PAGE_URL}>Vegetarian diet</NavLink>
      </li>
      <li className="menu-item">
        <NavLink to={RECIPES_DESSERTS_PAGE_URL}>Desserts</NavLink>
      </li>
    </ul>
  </nav>
);

export default Menu;
