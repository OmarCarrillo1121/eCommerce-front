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
  GET_ALL_USERS,
  GET_USERS_NOT_BANNED,
  BAN_USER,
  UNBAN_USER,
  GET_USERS_BANNED,
} from "./action-types";

const initialState = {
  allGames: [],
  allCopyGames: [],
  detailGame: {},
  
  allUsers: [],
  users: [],
  usersNotBanned: [],
  bannedUsers: [],
  user: {},

  loading: true,
};


const saveStateToLocalStorage = (state, action) => {
  try {
    if (action && action.type === POST_VIDEOGAME) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("appState", serializedState);
    }
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:

    const newStateGetAllGames = {
      ...state,
      allGames: action.payload,
      allCopyGames: action.payload,
      loading: false,
    };
    saveStateToLocalStorage(newStateGetAllGames);
    return newStateGetAllGames;

    case GET_BY_NAME_GAMES:
      const newStateGetByNameGames = {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
      };
      saveStateToLocalStorage(newStateGetByNameGames);
      return newStateGetByNameGames;

    case GET_BY_ID_GAMES:
      const { gamesId } = action.payload;
      const newStateGetByIdGames = {
        ...state,
        detailGame: {...action.payload},
        gamesId,
        loading: false,
      };
      saveStateToLocalStorage(newStateGetByIdGames);
      return newStateGetByIdGames;

    case RESET_DETAIL_GAMES:
      const newStateResetDetailGames = {
        ...state,
        detailGame: null,
        loading: false,
      };
      saveStateToLocalStorage(newStateResetDetailGames);
      return newStateResetDetailGames;

    /* POST VIDEOGAME */
    case POST_VIDEOGAME: {
      const newState={
        ...state 

      }
      saveStateToLocalStorage(newState, action);

      return newState;
       
    }

    /* EDIT VIDEOGAME */
    case EDIT_VIDEOGAME: {
      return { ...state };
    }

    /* GET ALL USERS */
    case GET_ALL_USERS : {
      return {
        ...state,
        users: [...action.payload],
        allUsers: [...action.payload],
      }
    }

    /* GET USERS NOT BANNED */
    case GET_USERS_NOT_BANNED : {
      return {
        ...state,
        users: [...action.payload],
        usersNotBanned: [...action.payload]
      }
    }

    /* GET BANNED USERS */
    case GET_USERS_BANNED : {
      return {
        ...state,
        bannedUsers: [...action.payload],
        users: [...action.payload]
      }
    }

    /* BAN USER */
    case BAN_USER : {
      return {...state,}
    }

    /* UNBAN USER */
    case UNBAN_USER : {
      return {...state}
    }

    //!EDWARD
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

    //!FIN EDWARD

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
