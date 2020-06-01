import React from "react";
import { observer } from "mobx-react";
import appStore from "../store/AppStore";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import NotificationContainer from "./notifications/NotificationContainer";
import Navigation from "./navigation/Navigation";
import Loader from "./loader/Loader";

import "./App.scss";

@observer
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navigation />
        <Main />
        <Footer />
        <NotificationContainer />
        {appStore.isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
