import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { observable } from "mobx";

import "./Image.scss";

interface IHeroImageProps {
  src: string;
  alt: string;
}

@observer
class Image extends React.Component<IHeroImageProps> {
  @observable isLoading = true;

  onLoad = () => {
    this.isLoading = false;
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={classNames("image", this.isLoading && "image__loading")}>
        <img src={src} alt={alt} onLoad={this.onLoad} />
        <div className="image_preview" />
      </div>
    );
  }
}

export default Image;
