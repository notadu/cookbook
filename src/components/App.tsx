import React from "react";
import { observer } from "mobx-react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import NotificationContainer from "./notifications/NotificationContainer";
import Loader from "./loader/Loader";
import Sidebar from "./sidebar/Sidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import appStore from "../store/AppStore";

import "./App.scss";

@observer
class App extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    appStore.initIsMobileWidth();
  };

  render() {
    return (
      <div className="container">
        <Header />
        {appStore.isMobileWidth ? <MobileSidebar /> : <Sidebar />}
        <Main />
        <Footer />
        <NotificationContainer />
        {appStore.isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
