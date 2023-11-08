import { Link } from "react-router-dom";
import Style from "./Card.module.css"

function Card ({ game }){
    const {id, name, image, price } = game
    const offer = Math.floor(Math.random() * 50)
    return(
        <figure>
            <Link to={`/detail/${id}`}>
            <div className = {Style.card}>
              <img className= {Style.card_game} src={image} alt={name} />
              <span className={Style.descuento}>-{offer}%</span>
            </div>
            </Link>
            <div className={Style.card_price}>
                <h2 className={Style.card_name}>{name}</h2>
                <h2>${price}</h2>
            </div>
        </figure>
    )
}

export default Card;