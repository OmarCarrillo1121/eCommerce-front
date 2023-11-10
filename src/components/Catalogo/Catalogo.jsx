import Paginado from "../../components/Paginado/Paginado";
import CardList from "../CardList/cardList";
import { usePaginate } from "../../util/hook/games/usePaginate";
import { useGames } from "../../util/hook/games/useGames";
import AlphabeticalOrder from "../Orders/Alphabetical/AlphabeticalOrder";
import PriceOrder from "../Orders/PriceOrder";
import Filters from "../Filters/Filters";

import "./Catalogo.css"; // Asegúrate de tener el archivo CSS

const Catalogo = () => {
  const { indexOfFirstGame,  indexOfLastGame, gamePerPage, paginado} = usePaginate()
  const { games } = useGames()

  return (
    <div className="catalog-container">
      <div className="filters-column">
        <Filters />
      </div>
      <div className="main-content">
        <AlphabeticalOrder />
        <PriceOrder />
        <CardList indexOfFirstGame={indexOfFirstGame} indexOfLastGame={indexOfLastGame}/>
        <Paginado paginado={paginado} gamesPerPage={gamePerPage} allGames={games.length} />
      </div>
    </div>
  );
};

export default Catalogo;
