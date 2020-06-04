import React from "react";
import { observer } from "mobx-react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import NotificationContainer from "./notifications/NotificationContainer";
import Menu from "./menu/Menu";
import Loader from "./loader/Loader";

import "./App.scss";

@observer
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Menu />
        <Main />
        <Footer />
        <NotificationContainer />
        <Loader />
      </div>
    );
  }
}

export default App;
