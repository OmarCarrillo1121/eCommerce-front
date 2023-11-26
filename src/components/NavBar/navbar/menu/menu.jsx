import React from "react";
import Style from "./menu.module.css";
import Search from "../../../Search/Search";
// import pcIcon from "../../../../Assets/img/icon/menu/pc.png";
// import psIcon from "../../../../Assets/img/icon/menu/ps.png";
// import xboxIcon from "../../../../Assets/img/icon/menu/xbox.png";
// import nintendoIcon from "../../../../Assets/img/icon/menu/nintendo.png";
import { useScroll } from "../../../../util/hook/landing/useScroll";

export default function Menu() {
  const { scrollY } = useScroll();
  return (
    <nav
      className={`${scrollY > 200 ? Style.nav_menu_scrolled : Style.nav_menu}`}
    >
      {/* <Platform img={pcIcon} tittle={"PC"} />
      <Platform img={psIcon} tittle={"PlatStation"} />
      <Platform img={xboxIcon} tittle={"Xbox"} />
      <Platform img={nintendoIcon} tittle={"Nintendo"} /> */}
      <Search />
    </nav>
  );
}

export const Platform = ({ img, tittle, mt }) => {
  return (
    <div className={Style.nav_menu_platform} style={{ marginTop: mt + "px" }}>
      <img src={img} alt="platform" />
      <span>{tittle}</span>
      <span className={Style.nav_menu_platform_icon}>{">"}</span>
    </div>
  );
};
