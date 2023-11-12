import { useState, useEffect } from "react";
import { useGames } from "../games/useGames";
import _ from "lodash";

export const useFilter = (setFilteredGames) => {
    const [filters, setFilters] = useState([])
    const { games } = useGames()

    const platforms = _.uniqBy(games, 'platform').map(game => game.platform);
    const developer = _.uniqBy(games, 'developer').map(game => game.developer);
    const genre = _.uniqBy(games, 'genre').map(game => game.genre);
    const sortPrice = _.sortBy(games, 'price')
    const sortBy = _.sortBy(games, 'name')

    const filtered = games.filter(game =>
        filters.every(filter => game.platform.includes(filter) || game.developer.includes(filter) || game.genre.includes(filter))
    );

    
    useEffect(() => {
        if (filters.length > 0) setFilteredGames(filtered)
        else setFilteredGames(games)
        if (filters.includes('Menor')) setFilteredGames(sortPrice)
        else if (filters.includes('Mayor')) setFilteredGames(sortPrice.reverse())
        if (filters.includes('Upward')) setFilteredGames(sortBy)
        else if (filters.includes('Downward')) setFilteredGames(sortBy.reverse())
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters, games])
    
    return { filters, setFilters, platforms, developer, genre }
}