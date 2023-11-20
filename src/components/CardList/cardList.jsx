import Style from './cardList.module.css'
import Card from "../Card/Card";
import { AnimatePresence } from 'framer-motion';

const CardList = ({ indexOfLastGame, indexOfFirstGame, currentGames }) => {
    return (
      <AnimatePresence>
        <div className={Style.cardList}>
          
        {Array.isArray(currentGames) &&
          currentGames.map((game) => (
            <Card key={game.id} game={game} />
          )).slice(indexOfFirstGame, indexOfLastGame)}
      </div>
        </AnimatePresence>
    )
}

export default CardList