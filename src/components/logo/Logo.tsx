import React from "react";
import { NavLink } from "react-router-dom";

import { HOME_PAGE_URL } from "../../constants/routes";

import "./Logo.scss";

const Logo = () => (
  <NavLink className="logo" to={HOME_PAGE_URL}>
    <h1 className="logo_title">My Cookbook</h1>
  </NavLink>
);

export default Logo;
