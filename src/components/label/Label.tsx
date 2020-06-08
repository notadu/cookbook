import React from "react";
import classNames from "classnames";

import "./Label.scss";

type LabelColor = "green" | "blue" | "red";

interface ILapelProps {
  color?: LabelColor;
  className?: string;
}
const Label: React.FunctionComponent<ILapelProps> = ({
  children,
  color,
  className,
}) => (
  <div className={classNames("label", color && `label__${color}`, className)}>
    {children}
  </div>
);

export default Label;
