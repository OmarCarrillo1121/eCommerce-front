import { useState } from "react";
import Paginado from "../../components/Paginado/Paginado";
import CardList from "../CardList/cardList";
import { usePaginate } from "../../util/hook/games/usePaginate";
import { useGames } from "../../util/hook/games/useGames";
import Filters from "../Filters/Filters";
import Style from './Catalogo.module.css'

const Catalogo = () => {
  const [filteredGames, setFilteredGames] = useState([])
  const { indexOfFirstGame,  indexOfLastGame, gamePerPage, paginado} = usePaginate()
  const { games } = useGames()
  return (
    <div className={Style.catalogo}>
      <div className={Style.catalogo_filters}>
        <Filters setFilteredGames={setFilteredGames}/>
      </div>
      <div className={Style.catalogo_card_list}>
        <CardList indexOfFirstGame={indexOfFirstGame} 
          indexOfLastGame={indexOfLastGame} 
          currentGames={filteredGames}/>
      </div>
      <Paginado paginado={paginado} gamesPerPage={gamePerPage} allGames={games.length} />
    </div>
  );
};

export default Catalogo;