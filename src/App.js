import React from "react";
import "./App.css";
import Header from "./Components/header";
import Home from "../src/Components/main";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;
