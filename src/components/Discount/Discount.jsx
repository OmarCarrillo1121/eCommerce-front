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
      <span className={Style.descuento}>
      </span>
    )}
    {porcentaje && priceDiscount && (
      <p>
          <span className={Style.originalPrice}>${price}</span>{" "}
          <span className={Style.discountedPrice}>${priceDiscount.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
}

export default Discount;
