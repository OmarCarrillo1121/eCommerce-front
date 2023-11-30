import React from "react";
import Style from "./footer.module.css";
// import fb from "../../Assets/img/icon/services/fb.png";
// import gh from "../../Assets/img/icon/services/github.webp";
// import google from "../../Assets/img/icon/services/google.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={Style.footer}>
      <div className={Style.footer_ul}>
        <ul className={Style.footer_ul_li}>
          <NavLink to={"/aboutUs"}>
            <li>Acerca de nosotros</li>
          </NavLink>
          <NavLink to={"/contact"}>
            <li>Contactanos</li>
          </NavLink>
        </ul>
        <ul className={Style.footer_icons}>
          {/* <img src={fb} alt="facebook" />
                <img src={gh} alt="github" />
                <img src={google} alt="google" /> */}
        </ul>
      </div>
      <span className={Style.footer_span}>
        Copyright © 2023 Ancora Games - All rights reserved
      </span>
    </footer>
  );
}
