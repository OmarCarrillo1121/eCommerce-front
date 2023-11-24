import React from "react";
import { useWindow } from "../../util/hook/window/useWindow";
import Style from "./input.module.css";

const Input = ({ userInfo, name, error, width }) => {
  const { viewportWidth } = useWindow();
  return (
    <div className={Style.group}>
      <input
        {...userInfo}
        name={name}
        id={name}
        className={Style.input}
        placeholder=" "
        style={{ width: `${viewportWidth <= 800 ? 300 + "px" : width + "px"}` }}
      />
      <label htmlFor={name} className={Style.label}>
        {name}
      </label>
    </div>
  );
};

export default Input;
