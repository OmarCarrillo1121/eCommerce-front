import React from "react";
import Style from "./Discount.module.css";

function calcPriceDiscount(price, discount) {
  return price - (price * discount) / 100;
}

function Discount({ price, porcentaje }) {
  const priceDiscount = porcentaje ? calcPriceDiscount(price, porcentaje) : null;
  const ahorro = porcentaje ? price - priceDiscount : null;

  return (
    <div className={Style.discountContainer}>
      {porcentaje && (
        <span className={Style.descuento}>
          -{porcentaje}% <span className={Style.ahorro}>Ahorra ${ahorro.toFixed(2)}</span>
        </span>
      )}
      {porcentaje && priceDiscount && (
        <p>
          <span className={Style.originalPrice}>Antes: ${price.toFixed(2)}</span>{" "}
          <span className={Style.discountedPrice}>Ahora: ${priceDiscount.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
}

export default Discount;

