import { Link } from "react-router-dom";
import style from "./card.module.css";

function Card({ game }) {
  const { id, name, image, price } = game;
  return (
    <Link to={`/detail/${id}`}>
      <div className={style.cardContainer}>
        <div className={style.card}>
          <img className={style.cardImg} src={image} alt={name} />
        </div>
        <div className={style.cardText}>
          <h2 className={style.cardTextName}>{name}</h2>
          <h2 className={style.cardTextPrice}>${price}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Card;
