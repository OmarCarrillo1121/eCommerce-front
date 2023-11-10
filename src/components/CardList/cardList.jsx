import { Fragment } from "react";
import Card from "../Card/Card";

const CardList = ({ indexOfLastGame, indexOfFirstGame, currentGames }) => {
    return (
        <Fragment>
          {currentGames?.map((game) => (
            <Card key={game.id} game={game}/>
          )).slice(indexOfFirstGame, indexOfLastGame)}
        </Fragment>
    )
}

export default CardList