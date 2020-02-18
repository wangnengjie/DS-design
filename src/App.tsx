/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import bindings from "bindings";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Icon } from "antd";
import { ipcRenderer } from "electron";
import Index from "./pages/Index/index";

const App = () => {
  console.log(bindings("hello").hello());
  return (
    <>
      <Icon
        type="close-circle"
        theme="twoTone"
        onClick={() => ipcRenderer.sendSync("closeWindow")}
        style={{
          position: "absolute",
          top: "5vh",
          right: "5vw",
          fontSize: "24px"
        }}
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Index}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
