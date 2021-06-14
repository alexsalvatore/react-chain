import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import RootLayout from "./components/root-layout";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <RootLayout></RootLayout>
      </Provider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
