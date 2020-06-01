import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/icons/cookies.svg";
import { HOME_PAGE_URL } from "../../constants/routes";

import "./Logo.scss";

const Logo = () => (
  <NavLink className="logo" to={HOME_PAGE_URL}>
    <LogoIcon className="logo_icon" />
    <h1 className="logo_title">My Cookbook</h1>
  </NavLink>
);

export default Logo;
