import React from "react";
import css from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../common/API/API";
import MainPage from "../features/Mainpage/MainPage";

function App() {
  return (
    <div className={css.App}>
      <MainPage />
    </div>
  );
}

export default App;
