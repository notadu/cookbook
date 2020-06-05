import React from "react";
import { observer } from "mobx-react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import NotificationContainer from "./notifications/NotificationContainer";
import Loader from "./loader/Loader";
import Sidebar from "./sidebar/Sidebar";

import "./App.scss";

@observer
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Sidebar />
        <Main />
        <Footer />
        <NotificationContainer />
        <Loader />
      </div>
    );
  }
}

export default App;
