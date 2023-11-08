import { Fragment } from "react";
import { useGames } from "../../util/hook/games/useGames";
import Card from "../Card/Card";

const CardList = () => {
    const { games } = useGames();
    return (
        <Fragment>
          {games?.map((game) => (
            <Card key={game.id} game={game}/>
          )).slice(0, 9)}
        </Fragment>
    )
}

export default CardList