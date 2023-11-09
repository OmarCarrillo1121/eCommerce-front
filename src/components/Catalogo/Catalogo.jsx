import { useGames } from '../../util/hook/games/useGames';
import { usePaginate } from '../../util/hook/games/usePaginate';
import CardList from '../CardList/cardList'
import Loading from "../../components/Loading/Loading";
import Paginado from "../../components/Paginado/Paginado";

const Catalogo = () => {
  const { games } = useGames()
  const { indexOfFirstGame,  indexOfLastGame, gamePerPage, paginado} = usePaginate()
  return (
    <div>
      {games.length ? (
        <div>
          <CardList indexOfLastGame={indexOfLastGame} indexOfFirstGame={indexOfFirstGame}/>
          <Paginado
            gamesPerPage={gamePerPage}
            allGames={games.length}
            paginado={paginado}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Catalogo;
