import CardList from "../../components/CardList/cardList";
import Style from "./home.module.css";
import { useGames } from "../../util/hook/games/useGames";

const Home = () => {
  const { games } = useGames();

  // Ordenar los juegos por descuento de mayor a menor
  const sortedGames = games.slice().sort((a, b) => b.discount - a.discount);

  return (
    <div className={Style.home}>
      <h1>
        Mejores ofertas <span className={Style.home_tittle}>{">"}</span>
      </h1>
      <div style={{ width: "100%" }}>
        <CardList
          indexOfFirstGame={0}
          indexOfLastGame={4}
          currentGames={sortedGames}
        />
      </div>
    </div>
  );
};

export default Home;
