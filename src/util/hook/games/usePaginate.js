import { useState, useEffect } from "react";
import { useGames } from "./useGames";

export const usePaginate = () => {
    const { games } = useGames()
    const [currentPage, setCurrentPage] = useState(1);
    const gamePerPage = 15;

    const indexOfLastGame = currentPage * gamePerPage;
    const indexOfFirstGame = indexOfLastGame - gamePerPage;

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        paginado(1);
    }, [games]);

    return { indexOfFirstGame,  indexOfLastGame, gamePerPage, paginado}
}