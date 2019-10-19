import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import privateRoute from "./components/privateRoute";
import BubblePage from "./components/BubblePage";


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props=> <Login {...props} />} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Route path="/bubbles" render={props => privateRoute(BubblePage, props)} />
      </div>
    </Router>
  );
}

export default App;
