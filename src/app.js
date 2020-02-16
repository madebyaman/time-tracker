import React from "react";
import { Link } from "@reach/router";
import Navigation from "./Navigation.js";
import "./style.css";

const App = () => {
  return (
    <div className="app">
      <div className="sidebar">
        <div className="items">
          <Link to="/analytics">Analytics</Link>
        </div>
        <div className="items">
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className="container">
        <Navigation />
      </div>
    </div>
  );
};

export default App;
