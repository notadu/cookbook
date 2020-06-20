import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class ScrollToTop extends React.Component<RouteComponentProps> {
  componentDidUpdate(prevProps: Readonly<RouteComponentProps>) {
    const { location } = this.props;

    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter(ScrollToTop);
