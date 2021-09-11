import React from "react";
import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css["lds-grid"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
