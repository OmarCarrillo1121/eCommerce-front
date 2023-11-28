import React from "react";
import Style from "./Discount.module.css"; // Asegúrate de tener un archivo CSS para los estilos

function calcPriceDiscount(price, discount) {
  return price - (price * discount) / 100;
}

function Discount({ price, porcentaje }) {
  const priceDiscount = porcentaje ? calcPriceDiscount(price, porcentaje) : null;
  const ahorro = porcentaje ? price - priceDiscount : null;

  return (
    <div className={Style.discountContainer}>
    {porcentaje && (
      <div>
      <span className={Style.descuento}>-{porcentaje}% </span>
      <span className={Style.ahorro}>Ahorra ${ahorro.toFixed(2)}</span>
      </div>
    )}
    {porcentaje && priceDiscount && (
      <p>
          <span className={Style.originalPrice}>Antes: ${price}</span>{" "}
          <span className={Style.discountedPrice}>Ahora: ${priceDiscount.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
}

export default Discount;
