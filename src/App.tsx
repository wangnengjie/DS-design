/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import bindings from "bindings";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Icon } from "antd";
import { ipcRenderer } from "electron";
import Index from "./pages/Index";
import SAT from "./pages/SAT";

const App = () => {
  console.log(bindings("hello").hello());
  return (
    <>
      <Icon
        type="close-circle"
        onClick={() => ipcRenderer.sendSync("closeWindow")}
        style={{
          position: "absolute",
          top: "5vh",
          right: "5vw",
          fontSize: "24px",
          color: "#40a9ff"
        }}
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/SAT" component={SAT} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
