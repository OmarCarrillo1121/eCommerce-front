import CardList from "../../components/CardList/cardList";
import Style from './home.module.css'
import { useGames } from "../../util/hook/games/useGames";

const Home = () =>{
    const { games } = useGames()
    return(
        <div className={Style.home}>
            <h1>Ofertas <span className={Style.home_tittle}>{'>'}</span></h1>
            <div style={{width: 100 + '%'}}>
                <CardList indexOfFirstGame={0} indexOfLastGame={9} currentGames={games}/>
            </div>
        </div>
    )
}

export default Home;