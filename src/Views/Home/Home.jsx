import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { getAllGames } from "../../redux/actions";

import Cards from "../../components/Cards/Cards"
import Loading from "../../components/Loading/Loading";

import Style from './home.module.css'

const Home = () =>{
    const dispatch = useDispatch()
    const allGames = useSelector((state) => state.allGames)
    console.log("soy todos los juegos",  allGames)
    //const loading = useSelector ((state) => state.loading)
    const [ currentPage, setCurrentPage] = useState(1)
    const gamePerPage = 10;

    useEffect(() =>{
        dispatch(getAllGames())
    },[dispatch])

    const indexOfLastGame = currentPage * gamePerPage;
    const indexOfFirstGame = indexOfLastGame - gamePerPage ;

    const gameMatchingFilter = allGames.filter((game) => game )
    const currentGames = gameMatchingFilter.slice(indexOfFirstGame, indexOfLastGame)

    return(
        <div className={Style.home}>

            {allGames.length ?(
                <div>
                    <Cards games ={currentGames} />
                </div>
            ):(
                
                    <Loading />
                
            )}

        </div>
    )
}

export default Home;