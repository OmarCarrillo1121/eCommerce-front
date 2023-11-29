import { Link } from "react-router-dom";
import Style from "./Card.module.css";
import { motion } from "framer-motion";
import Discount from "../Discount/Discount";

function Card({ game }) {

  const { id, name, image, price, discount } = game;
  return (
    <motion.div className={Style.cardContainer}>
    <Link to={`/detail/${id}`}>
      <div className={Style.card}>
        <img className={Style.card_game} src={image} alt={name} />
        <span className={Style.descuento}>-{discount}%</span>
      </div>
    </Link>
    <div className={Style.card_price}>
      <h2 className={Style.card_name}>{name}</h2>
      <Discount price={price} porcentaje={discount} />
    </div>
  </motion.div>
  );
}

export default Card;
