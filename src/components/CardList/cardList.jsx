import { Fragment } from "react";
import { useGames } from "../../util/hook/games/useGames";
import Card from "../Card/Card";

const CardList = ({ indexOfLastGame, indexOfFirstGame }) => {
    const { games } = useGames();
    return (
        <Fragment>
          {games?.map((game) => (
            <Card key={game.id} game={game}/>
          )).slice(indexOfFirstGame, indexOfLastGame)}
        </Fragment>
    )
}

export default CardList