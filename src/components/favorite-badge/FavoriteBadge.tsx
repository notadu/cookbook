import React from "react";
import classNames from "classnames";

import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";

import "./FavotiteBadge.scss";

interface IFavoriteBadgeProps {
  isChecked: boolean;
  onToggle: () => void;
}

class FavoriteBadge extends React.Component<IFavoriteBadgeProps> {
  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onToggle } = this.props;
    e.preventDefault();
    onToggle();
  };

  handleKeyDown = (e: React.KeyboardEvent) => {
    const { onToggle } = this.props;
    if (e.key === "Enter") {
      onToggle();
    }
  };

  render() {
    const { isChecked } = this.props;

    return (
      <div
        className={classNames(
          "favorite-badge",
          isChecked && "favorite-badge__checked"
        )}
        role="presentation"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        <HeartIcon />
      </div>
    );
  }
}

export default FavoriteBadge;
