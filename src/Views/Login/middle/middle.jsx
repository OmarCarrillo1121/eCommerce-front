import React from "react";
import Style from "./middle.module.css";

const Middle = () => {
  return (
    <div className={Style.form_or_container}>
      <div className={Style.form_or} />
      <h2>Or</h2>
      <div className={Style.form_or} />
    </div>
  );
};

export default Middle;
