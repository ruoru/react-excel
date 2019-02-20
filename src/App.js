import React, { Component } from "react";
import ReactExcel from "./components/ReactExcel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactExcel
          data={
            [["City", "Beijing", "Shanghai", "Guangzhou"],
            ["Temperature", "5", "22", "29"],
            ["Weather", "Windy", "Sunny", "Rainy"]]
          }
        />
      </div>
    );
  }
}

export default App;
