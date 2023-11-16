import { Link } from "react-router-dom";
import Style from "./Card.module.css"
import { motion } from "framer-motion";

function Card ({ game }){
    const {id, name, image, price, discount } = game
    return(
        <motion.figure className={Style.carta} key={id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          >
            <Link to={`/detail/${id}`}>
            <div className = {Style.card}>
              <img className= {Style.card_game} src={image} alt={name} />
              <span className={Style.descuento}>-{discount}%</span>
            </div>
            </Link>
            <div className={Style.card_price}>
                <h2 className={Style.card_name}>{name}</h2>
                <h2>${price}</h2>
            </div>
        </motion.figure>
    )
}

export default Card