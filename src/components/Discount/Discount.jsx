import React from "react";
import Style from "./Discount.module.css";

function Discount({ price, porcentaje }) {
  const priceDiscount = porcentaje ? price - (price * porcentaje) / 100 : null;

  // Verifica si hay descuento y renderiza según la condición
  return (
    <div className={Style.discountContainer}>
      {porcentaje !== 0 &&
        priceDiscount !== null && ( // Asegúrate de que priceDiscount no sea null ni undefined
          <p>
            <span className={Style.originalPrice}>{`$${price.toFixed(
              2
            )}`}</span>{" "}
            <span className={Style.discountedPrice}>{`$${priceDiscount.toFixed(
              2
            )}`}</span>
          </p>
        )}
      {porcentaje === 0 && ( // Mostrar solo el precio sin descuento
        <p>
          <span className={Style.originalPriceNoDiscount}>{`$${price.toFixed(
            2
          )}`}</span>
        </p>
      )}
    </div>
  );
}

export default Discount;

