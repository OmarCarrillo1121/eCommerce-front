import Card from "../Card/Card";
import styles from "./Cards.module.css"


function Cards ({ games }){

    return(
        <div className={styles.container}>
            {
                games?.map((game, index) =>(
                    <Card key={index} game={game} />
                )) 
            }
            
        </div>
    )
}

export default Cards;