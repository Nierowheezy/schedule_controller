import React from "react";
import "./App.css";
import EventCalendar from "./Containers/EventCalendar";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span
            className="glyphicon glyphicon-calendar"
            style={{ marginRight: "10px" }}
          ></span>
          Shift Controller{" "}
        </h1>
      </header>
      <EventCalendar />
      <footer>
        <hr />
        <h5>
          Developed By: Olaniyi Olabode D. |{" "}
          {new Date().getFullYear().toString()}{" "}
        </h5>
      </footer>
    </div>
  );
};

export default App;
