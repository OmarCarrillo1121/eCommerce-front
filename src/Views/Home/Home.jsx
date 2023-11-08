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









/*
    
    const dispatch = useDispatch()
  const [ currentPage, setCurrentPage] = useState(1)
    const gamePerPage = 10;

    useEffect(() =>{
        dispatch(getAllGames())
    },[dispatch])

    const indexOfLastGame = currentPage * gamePerPage;
    const indexOfFirstGame = indexOfLastGame - gamePerPage ;

    const gameMatchingFilter = allGames.filter((game) => game )
    const currentGames = gameMatchingFilter.slice(indexOfFirstGame, indexOfLastGame) */