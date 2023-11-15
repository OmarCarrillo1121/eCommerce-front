import { useState, useEffect } from "react";
import { useGames } from "../games/useGames";
import _ from "lodash";

export const useFilter = (setFilteredGames) => {
    const [filters, setFilters] = useState([])
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(999)
    const { games } = useGames()
    const platforms = _.uniqBy(games, 'platform').map(game => game.platform);
    const developer = _.uniqBy(games, 'developer').map(game => game.developer);
    const genre = _.uniqBy(games, 'genre').map(game => game.genre);
    const sortPrice = _.sortBy(games, 'price')
    const sortBy = _.sortBy(games, 'name')

    const filtered = games.filter(game =>
        filters.every(filter => game.platform.includes(filter) || game.developer.includes(filter) || game.genre.includes(filter))
    );

    const minMax = games.filter((game) => game.price >= min && game.price <= max)
        console.log(filters);
    useEffect(() => {
        if (filters.length > 0) setFilteredGames(filtered)
        else setFilteredGames(minMax)
        if (filters.includes('Price: Low')) setFilteredGames(sortPrice)
        else if (filters.includes('Price: High')) setFilteredGames(sortPrice.reverse())
        if (filters.includes('Alpha: Up')) setFilteredGames(sortBy)
        else if (filters.includes('Alpha: Down')) setFilteredGames(sortBy.reverse())
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[filters, games, min, max])
    
    return { filters, setFilters, platforms, developer, genre, min, setMin, max, setMax }
}