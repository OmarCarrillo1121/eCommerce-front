import React from "react";
import Style from "./services.module.css";
import fbIcon from "../../../Assets/img/icon/services/fb.png";
import googleIcon from "../../../Assets/img/icon/services/google.png";
import githubIcon from "../../../Assets/img/icon/services/github.webp";

const Services = () => {
  return (
    <article className={Style.services}>
      <h1>Log in</h1>
      <div className={Style.services_icons}>
        <img src={fbIcon} alt="fb" />
        <img src={googleIcon} alt="google" />
        <img src={githubIcon} alt="github" />
      </div>
    </article>
  );
};

export default Services;
