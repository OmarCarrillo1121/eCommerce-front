import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getByName, setCurrentPage } from "../../../../../../redux/actions";
import style from './games.module.css'
import Pagination from "../pagination/Pagination";

function Games() {
    const { allGames, currentPage } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ time, setTime ] = useState(false)
    const [ name, setName ] = useState("")


    const gamesPerPage = 10;
    const totalGames = allGames.length

    const firstIndex = gamesPerPage * (currentPage - 1)
    const lastIndex = firstIndex + gamesPerPage

    let currentPageData = allGames.slice(firstIndex, lastIndex)


    const onPageChange  = (pageNum) => {
        dispatch(setCurrentPage(pageNum))
    }

    const lookAtName = (e) => {
        const { value } = e.target

        if (value === "") {
            dispatch(getAllGames())
        }
        setName(value)
    }

    const searchToGame = (e) => {
        e.preventDefault()

        dispatch(getByName(name))
        setTime(true)

        // if (rolSelect.value !== "All roles") {
        //     rolSelect.value = "All roles";
        // }

        // if (statusSelect.value !== "All users") {
        //     statusSelect.value = "All users";
        // }
    }

    const showAllGames = (e) => {
        e.preventDefault()

        setName("")
        // if (rolSelect.value !== "All roles") {
        //     rolSelect.value = "All roles";
        // }

        // if (statusSelect.value !== "All users") {
        //     statusSelect.value = "All users";
        // }

        dispatch(getAllGames())
        setTime(false)
    }

    useEffect(()=> {
        dispatch(getAllGames())
    }, [])

    return (<>  
        <div className={style.tabletGames}>
            <div className={style.searchbar}>
                <input  type="text" value={name} onChange={lookAtName} placeholder="Search for a game"/>
                <button onClick={searchToGame}>🔍︎</button>
            </div>
            <table>
                <thead>
                    <tr className={style.row}>
                        <th></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Developer</th>
                        <th>Platform</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentPageData.length > 0 
                    ? currentPageData.map((game, index) => {
                        const rowClass = index % 2 === 0 ? style['rowEven'] : style['rowOdd']

                        return (
                            <tr className={`${style.row} ${rowClass}`} key={game.id}>
                                <td><button>⁝</button></td>
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>{game.genre}</td>
                                <td>{game.developer}</td>
                                <td>{game.platform}</td>
                                <td>{game.price}</td>
                                <td>{game.stock}</td>
                                <td>{game.discount}</td>
                            </tr>
                        )
                    }): null 
                    // <NotUser/>
                }
                </tbody>
            </table>
            <Pagination
                totalUsers={totalGames}
                currentPage={currentPage}
                pageSize={gamesPerPage}
                onPageChange={onPageChange}
            />
            <div className={style.containerMessage}>
                <p><b>Didn't find what are looking for?</b> Some games may be hidden because of the filters you've selected.</p>
                <button className={style.showGames} onClick={showAllGames}>Show all games</button>
                {
                    allGames.length !== 1 
                    ? <small>{allGames.length} games found</small>
                    : <small>{allGames.length} game found</small>
                }
            </div>
        </div>
    </>);
}

export default Games;