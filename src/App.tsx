import React from "react";
import css from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./API/API";
import MainPage from "./Components/Mainpage/MainPage";

function App() {
  return (
    <div className={css.App}>
      <MainPage />
    </div>
  );
}

export default App;
