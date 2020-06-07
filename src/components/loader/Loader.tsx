import React from "react";
import { observer } from "mobx-react";

import { ReactComponent as LoaderIcon } from "../../assets/icons/refresh.svg";

import "./Loader.scss";

const Loader = observer(() => (
  <div className="loader">
    <LoaderIcon />
  </div>
));

export default Loader;
