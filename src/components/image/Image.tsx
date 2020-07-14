import React, { useState } from "react";
import classNames from "classnames";

import "./Image.scss";

interface IHeroImageProps {
  src: string;
  alt: string;
}

const Image: React.FunctionComponent<IHeroImageProps> = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={classNames("image", isLoading && "image__loading")}>
      <img src={src} alt={alt} onLoad={() => setIsLoading(false)} />
      <div className="image_preview" />
    </div>
  );
};

export default Image;
