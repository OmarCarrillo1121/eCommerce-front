import { Link } from "react-router-dom";
import styles from "./Card.module.css"

function Card ({ game }){

    const {id, name, image, price } = game

    return(
        <div className = {styles.container}>
            <h2 className={styles.name}>{name}</h2>
            <Link to = {`/home/detail/${id}`}>
                <img className= {styles.image_card} src={image} alt={name} />
            </Link>
            <h2  className={styles.price}>{price}</h2>
        </div>
    )
}

export default Card;