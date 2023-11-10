import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDeveloper, filterGenre, filterPlatform, getAllGames } from "../../redux/actions";

import "./Filters.css"; // Asegúrate de tener el archivo CSS

const Filters = () => {
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const games = useSelector((state) => state.allCopyGames);
    const gamesUse = useSelector((state) => state.allGames);

    const handlePlatformChange = (event) => {
        const platform = event.target.value;
        toggleSelection(selectedPlatforms, platform, setSelectedPlatforms);
    };

    const handleDeveloperChange = (event) => {
        const developer = event.target.value;
        toggleSelection(selectedDevelopers, developer, setSelectedDevelopers);
    };

    const handleGenreChange = (event) => {
        const genre = event.target.value;
        toggleSelection(selectedGenres, genre, setSelectedGenres);
    };

    const toggleSelection = (selectedValues, value, setSelectedFunction) => {
        if (selectedValues.includes(value)) {
        setSelectedFunction(selectedValues.filter((v) => v !== value));
        } else {
        setSelectedFunction([...selectedValues, value]);
        }
    };

    const uniquePlatforms = [...new Set(games.map((game) => game.platform))];
    const uniqueDevelopers = [...new Set(games.map((game) => game.developer))];
    const uniqueGenres = [...new Set(games.map((game) => game.genre))];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterPlatform(selectedPlatforms));
    }, [selectedPlatforms]);
    
    useEffect(() => {
        dispatch(filterDeveloper(selectedDevelopers));
    }, [selectedDevelopers]);

    useEffect(() => {
        dispatch(filterGenre(selectedGenres));
    }, [selectedGenres]);

    return (
        <div className="filters-container">
        <h1>Aqui van los filtros</h1>
        <h1>Selecciona las plataformas:</h1>
        {uniquePlatforms.map((platform) => (
            <label key={platform}>
            <input
                type="checkbox"
                value={platform}
                checked={selectedPlatforms.includes(platform)}
                onChange={handlePlatformChange}
            />
            {platform}
            </label>
        ))}
        <h1>Plataformas seleccionadas:</h1>
        {selectedPlatforms.map((selectedPlatform) => (
            <div key={selectedPlatform}>{selectedPlatform}</div>
        ))}

        <h1>Selecciona los desarrolladores:</h1>
        {uniqueDevelopers.map((developer) => (
            <label key={developer}>
            <input
                type="checkbox"
                value={developer}
                checked={selectedDevelopers.includes(developer)}
                onChange={handleDeveloperChange}
            />
            {developer}
            </label>
        ))}
        <h1>Desarrolladores seleccionados:</h1>
        {selectedDevelopers.map((selectedDeveloper) => (
            <div key={selectedDeveloper}>{selectedDeveloper}</div>
        ))}

        <h1>Selecciona los géneros:</h1>
        {uniqueGenres.map((genre) => (
            <label key={genre}>
            <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
            />
            {genre}
            </label>
        ))}
        <h1>Géneros seleccionados:</h1>
        {/* {console.log('Géneros Seleccionadas Array',selectedGenres)} */}
        {selectedGenres.map((selectedGenre) => (
            <div key={selectedGenre}>{selectedGenre}</div>
        ))}
        </div>
    );
};

export default Filters;
