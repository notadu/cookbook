import React from "react";
import classNames from "classnames";

import "./FadeImage.scss";
import { observer } from "mobx-react";
import { observable } from "mobx";

interface IHeroImageProps {
  src: string;
  previewSrc: string;
  alt: string;
}

@observer
class FadeImage extends React.Component<IHeroImageProps> {
  @observable isLoading = true;

  onLoad = () => {
    this.isLoading = false;
  };

  render() {
    const { src, previewSrc, alt } = this.props;
    console.log(this.isLoading);
    return (
      <div
        className={classNames(
          "fade-image",
          this.isLoading && "fade-image__loading"
        )}
      >
        <img
          src={src}
          alt={alt}
          className="fade-image_main"
          onLoad={this.onLoad}
        />
        <img src={previewSrc} alt={alt} className="fade-image_preview" />
      </div>
    );
  }
}

export default FadeImage;
