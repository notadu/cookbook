import React from "react";
import { observer } from "mobx-react";

import { ReactComponent as LoaderIcon } from "../../assets/icons/refresh.svg";
import appStore from "../../store/AppStore";

import "./Loader.scss";

const Loader = observer(() =>
  appStore.isLoading ? (
    <div className="loader">
      <LoaderIcon />
    </div>
  ) : null
);

export default Loader;
