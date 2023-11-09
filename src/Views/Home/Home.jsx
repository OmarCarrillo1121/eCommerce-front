import CardList from "../../components/CardList/cardList";
import Style from './home.module.css'

const Home = () =>{
    return(
        <div className={Style.home}>
            <h1>Offers <span className={Style.home_tittle}>{'>'}</span></h1>
            <CardList/>
        </div>
    )
}

export default Home;