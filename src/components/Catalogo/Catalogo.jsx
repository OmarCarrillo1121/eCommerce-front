import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import Paginado from "../../components/Paginado/Paginado";
import CardList from "../CardList/cardList";
import AlphabeticalOrder from "../Orders/Alphabetical/AlphabeticalOrder";
import PriceOrder from "../Orders/PriceOrder";
import Filters from "../Filters/Filters";

import "./Catalogo.css"; // Asegúrate de tener el archivo CSS

const Catalogo = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [currentPage, setCurrentPage] = useState(1);
  const gamePerPage = 15;

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const indexOfLastGame = currentPage * gamePerPage;
  const indexOfFirstGame = indexOfLastGame - gamePerPage;

  const gameMatchingFilter = allGames.filter((game) => game);
  const currentGames = gameMatchingFilter.slice(
    indexOfFirstGame,
    indexOfLastGame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    paginado(1);
  }, [allGames]);

  return (
    <div className="catalog-container">
      <div className="filters-column">
        <Filters />
      </div>
      <div className="main-content">
        <AlphabeticalOrder />
        <PriceOrder />
        <CardList games={currentGames} />
        <Paginado paginado={paginado} gamePerPage={gamePerPage} totalGames={gameMatchingFilter.length} />
      </div>
    </div>
  );
};

export default Catalogo;
