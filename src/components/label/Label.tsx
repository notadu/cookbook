import React from "react";
import classNames from "classnames";

import "./Label.scss";

type LabelColor = "green" | "blue" | "yellow";

interface ILapelProps {
  color?: LabelColor;
}
const Label: React.FunctionComponent<ILapelProps> = ({ children, color }) => (
  <div className={classNames("label", color && `label__${color}`)}>
    {children}
  </div>
);

export default Label;
