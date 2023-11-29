import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { deleteVideogame, getActiveGames, getAllGames, getByName, restoreVideogame, setCurrentPage } from "../../../../../../redux/actions";
import style from './games.module.css'
import Pagination from "../pagination/Pagination";

function Games() {
    const { activeGames, currentPage } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ time, setTime ] = useState(false)
    const [ name, setName ] = useState("")
    const [ editGame, setEditGame] = useState({})

    const gamesPerPage = 10;
    const totalGames = activeGames.length

    const firstIndex = gamesPerPage * (currentPage - 1)
    const lastIndex = firstIndex + gamesPerPage

    let currentPageData = activeGames.slice(firstIndex, lastIndex)


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
    }

    const showAllGames = (e) => {
        e.preventDefault()

        setName("")
        dispatch(getAllGames())
    }

    const openOptions = (game) => {
        setEditGame(game)
        setTime(true)
    }

    const closeEditor = (e) => {
        e.preventDefault()
        setTime(false)
        setEditGame({})
    }

    const disableGame = (id) => {
        dispatch(deleteVideogame(id))
        setTime(false)
        setEditGame({})
    }

    const restoreGame = (id) => {
        dispatch(restoreVideogame(id))
        setTime(false)
        setEditGame({})
    }

    useEffect(()=> {
        dispatch(getActiveGames())
    }, [])

    return (<>  
        <div className={style.tabletGames}>
            <NavLink className={style.addGame} to={'/formVideogame'}>Agrega un Videojuego</NavLink>
            <div className={style.searchbar}>
                <input  type="text" value={name} onChange={lookAtName} placeholder="Busca un nombre"/>
                <button onClick={searchToGame}>🔍︎</button>
            </div>
            <table>
                <thead>
                    <tr className={style.row}>
                        <th></th>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Género</th>
                        <th>Desarrollador</th>
                        <th>Plataforma</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Descuento</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentPageData.length > 0 
                    ? currentPageData.map((game, index) => {
                        const rowClass = index % 2 === 0 ? style['rowEven'] : style['rowOdd']

                        return (
                            <tr className={`${style.row} ${rowClass}`} key={game.id}>
                                <td><button onClick={() => openOptions(game)}>⁝</button></td>
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
                <p><b>¿No encontraste lo que buscabas?</b> Es posible que algunos videojuegos
          estén ocultas debido a los filtros que has seleccionado.</p>
                <button className={style.showGames} onClick={showAllGames}>Mostrar todos los videojuegos</button>
                {
                    activeGames.length !== 1 
                    ? <small>{activeGames.length} videojuegos encontrados</small>
                    : <small>{activeGames.length} videojuego encontrado</small>
                }
            </div>
        </div>
        {
            time ? <div className={style.overlay}>
                <div className={style.openEditor}>
                    <div className={style.containerEditGame}>
                        <button className={style.btnCloseEditor} onClick={closeEditor}>X</button>
                        <hr />
                        <div className={style.editContainer}>
                            <p>Dale click al botón de abajo para editar el videojuego</p>
                            <NavLink to={`/editVideogame/${editGame.id}`} className={style.btnEdit}>
                                Editar videojuego
                            </NavLink>
                        </div>
                        <div className={style.deleteContainer}>
                            <p>¿Quieres {editGame.deleted === true ? 'habilitar' : 'desabilitar'} el videojuego?</p>
                            {
                                editGame.deleted 
                                ? <button className={style.btnDelete} onClick={() => restoreGame(editGame.id)}>Habilitar</button>
                                : <button className={style.btnDelete} onClick={() => disableGame(editGame.id)}>Desabilitar</button>
                            }
                        </div>
                    </div>
                </div>
            </div> 
            : null
        }
    </>);
}

export default Games;