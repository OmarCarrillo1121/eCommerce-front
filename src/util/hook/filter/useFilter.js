import { useState, useEffect } from "react";
import { useGames } from "../games/useGames";
import _ from "lodash";

export const useFilter = (setFilteredGames) => {
    const [filters, setFilters] = useState([])
    const { games } = useGames()

    const platforms = _.uniqBy(games, 'platform').map(game => game.platform);
    const developer = _.uniqBy(games, 'developer').map(game => game.developer);
    const genre = _.uniqBy(games, 'genre').map(game => game.genre);

    const filtered = games.filter(game =>
        filters.every(filter => game.platform.includes(filter) || game.developer.includes(filter) || game.genre.includes(filter))
    );
    useEffect(() => {
        if (filtered.length > 0) setFilteredGames(filtered)
        else setFilteredGames(games)
    },[filters, games])
    return { filters, setFilters, platforms, developer, genre }
}