import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
// import logo from "./logo.svg";
// import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={MainPage} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
