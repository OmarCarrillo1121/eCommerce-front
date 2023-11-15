import {
  GET_ALL_GAMES,
  GET_BY_NAME_GAMES,
  GET_BY_ID_GAMES,
  RESET_DETAIL_GAMES,
  POST_VIDEOGAME,
  EDIT_VIDEOGAME,
  ORDER,
  FILTER_PLATFORM,
  FILTER_DEVELOPER,
  FILTER_GENRE,
} from "./action-types";

const initialState = {
  allGames: [],
  allCopyGames: [],
  detailGame: {"id": 1,
  "name": "Mario Galaxy 2",
  "description": "Únete al único e irrepetible Mario en un viaje por extraños planetas en los que te esperan nuevas trampas y peligros, en Super Mario Galaxy 2.",
  "image": "https://m.media-amazon.com/images/I/81iCVhLDJFL.jpg",
  "genre": "Accion",
  "developer": "Nintendo",
  "platform": "Nintendo Switch",
  "price": 50.5,
  "stock": 12,
  "deleted": false},
  loading: true,
};
// luis c barrios
export const getInitialState = () => {
  const storedState = JSON.parse(localStorage.getItem("yourGameState")) ?? { allGames: [], allCopyGames: [], detailGame: null, loading: false };
  return storedState;
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
      };

    case GET_BY_NAME_GAMES:
     
      return {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
      };

    case GET_BY_ID_GAMES:
      const { gamesId } = action.payload;
      return {
        ...state,
        detailGame: action.payload,
        gamesId,
        loading: false,
      };
    case RESET_DETAIL_GAMES:
      
      return {
        ...state,
        detailGame: null,
        loading: false,
      };

    /* POST VIDEOGAME */
    case POST_VIDEOGAME: {
      return { ...state };
    }

    /* EDIT VIDEOGAME */
    case EDIT_VIDEOGAME: {
      return { ...state };
    }

    /* DELETE VIDEOGAME */

    case ORDER:
      const copiAllGames = [...state.allGames]; //Copia de all games
      const orden = (payload) => {
        if (payload === "A")
          copiAllGames.sort((a, b) => a.name.localeCompare(b.name));
        if (payload === "B")
          copiAllGames.sort((a, b) => b.name.localeCompare(a.name));
        if (payload === "priceLowToHigh") {
          copiAllGames.sort((a, b) => a.price - b.price);
        }
        if (payload === "priceHighToLow") {
          copiAllGames.sort((a, b) => b.price - a.price);
        }
      };
      orden(action.payload);
      return {
        ...state,
        allGames: copiAllGames,
      };
    case FILTER_PLATFORM:
      const filterPlatform = state.allCopyGames.filter((game) =>
        action.payload.includes(game.platform)
      );

      return {
        ...state,
        allGames: filterPlatform,
      };

    case FILTER_DEVELOPER:
      const filterDeveloper = state.allCopyGames.filter((game) =>
        action.payload.includes(game.developer)
      );
      return {
        ...state,
        allGames: filterDeveloper,
      };

    case FILTER_GENRE:
      const filterGenre = state.allCopyGames.filter((game) =>
        action.payload.includes(game.genre)
      );
      return {
        ...state,
        allGames: filterGenre,
      };

    

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
