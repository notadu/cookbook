import React from "react";

import "./Footer.scss";

const Footer = () => (
  <footer className="cook-footer">
    <div>
      Icons made by{" "}
      <a
        href="https://www.flaticon.com/authors/freepik"
        title="Freepik"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freepik
      </a>{" "}
      from{" "}
      <a
        href="https://www.flaticon.com/"
        title="Flaticon"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        www.flaticon.com
      </a>
    </div>
    <div>
      API provided by{" "}
      <a
        href="https://spoonacular.com/food-api/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Spoonacular API
      </a>
    </div>
  </footer>
);

export default Footer;
