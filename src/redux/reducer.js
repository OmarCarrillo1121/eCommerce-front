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
  UPDATE_USER,
  GET_ALL_REVIEWS,
  GET_DELETED_REVIEWS,
  GET_ENABLED_REVIEWS,
  DELETE_REVIEW,
  RESTORE_REVIEW,
  GET_ALL_BANNERS,
  DELETE_BANNER,
  RESTORE_BANNER,
  GET_DELETED_BANNERS,
  GET_ENABLED_BANNERS,
  GET_USER_BY_ID,
  FILTER_BY_ROL,
  GET_USER_BY_NAME,
  AUTH_USER,
  SET_CURRENT_PAGE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
} from "./action-types";

const initialState = {
  allGames: [],
  allCopyGames: [],
  detailGame: {},

  allUsers: [],
  users: [],
  usersByName: [],
  usersNotBanned: [],
  bannedUsers: [],
  adminsFiltered: [],
  usersFilteredO: [],
  user: {},
  statusFilter: "all",
  rolFilter: "All roles",
  authUser: {},
  currentPage: 1,

  allReviews: [],
  reviews: [],
  deletedReviews: [],
  enabledReviews: [],
  review: {},

  allBanners: [],
  banners: [],
  deletedBanners: [],
  enabledBanners: [],
  banner: {},
  loading: true,

  loadingReviews: false,
  error: null,
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

    case GET_BY_ID_GAMES: {
      const { gamesId } = action.payload;
      const newStateGetByIdGames = {
        ...state,
        detailGame: { ...state.detailGame, ...action.payload }, // Combinar detailGame con action.payload
        gamesId,
        loading: false,
      };

      saveStateToLocalStorage(newStateGetByIdGames);
      // console.log("adios", newStateGetByIdGames);
      // console.log("holadetaiñ", state.detailGame);
      // Retornar un nuevo estado que incluye la actualización de detailGame
      return {
        ...newStateGetByIdGames,
        // Otros campos globales que puedas tener en tu estado
      };
    }

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
      const newState = {
        ...state,
      };
      saveStateToLocalStorage(newState, action);

      return newState;
    }

    /* EDIT VIDEOGAME */
    case EDIT_VIDEOGAME: {
      return { ...state };
    }

    /* GET ALL USERS */
    case GET_ALL_USERS: {
      if (state.rolFilter === "All roles") {
        return {
          ...state,
          users: [...action.payload],
          allUsers: [...action.payload],
          statusFilter: "all",
          currentPage: 1,
        };
      }

      const adminsFilteredNew = state.adminsFiltered;

      return {
        ...state,
        users: adminsFilteredNew,
        allUsers: [...action.payload],
        statusFilter: "all",
        currentPage: 1,
      };
    }

    /* GET USERS NOT BANNED */
    case GET_USERS_NOT_BANNED: {
      if (state.rolFilter === "All roles") {
        const newUsers = state.allUsers.filter((user) => {
          if (!user.banned) {
            return user;
          }
        });

        return {
          ...state,
          users: [...newUsers],
          statusFilter: "active",
          usersNotBanned: [...newUsers],
          currentPage: 1,
        };
      }

      const newUsers = state.adminsFiltered.filter((user) => {
        if (!user.banned) {
          return user;
        }
      });

      return {
        ...state,
        users: [...newUsers],
        statusFilter: "active",
        usersNotBanned: [...newUsers],
        currentPage: 1,
      };
    }

    /* GET BANNED USERS */
    case GET_USERS_BANNED: {
      if (state.rolFilter === "All roles") {
        const newUsers = state.allUsers.filter((user) => {
          if (user.banned) {
            return user;
          }
        });

        return {
          ...state,
          users: [...newUsers],
          bannedUsers: [...newUsers],
          statusFilter: "banned",
          currentPage: 1,
        };
      }

      const newUsers = state.adminsFiltered.filter((user) => {
        if (user.banned) {
          return user;
        }
      });

      return {
        ...state,
        users: [...newUsers],
        bannedUsers: [...newUsers],
        statusFilter: "banned",
        currentPage: 1,
      };
    }

    /* BAN USER */
    case BAN_USER: {
      return { ...state };
    }

    /* UNBAN USER */
    case UNBAN_USER: {
      return { ...state };
    }

    /* UPDATE USER */
    case UPDATE_USER: {
      return { ...state };
    }

    /* GET ALL REVIEWS */
    case GET_ALL_REVIEWS: {
      return {
        ...state,
        reviews: [...action.payload],
        allReviews: [...action.payload],
      };
    }

    /* GET DELETED REVIEWS */
    case GET_DELETED_REVIEWS: {
      return {
        ...state,
        deletedReviews: [...action.payload],
        reviews: [...action.payload],
      };
    }

    /* GET ENABLED REVIEWS */
    case GET_ENABLED_REVIEWS: {
      return {
        ...state,
        enabledReviews: [...action.payload],
        reviews: [...action.payload],
      };
    }

    /* DELETE REVIEW */
    case DELETE_REVIEW: {
      return { ...state };
    }

    /* RESTORE REVIEW */
    case RESTORE_REVIEW: {
      return { ...state };
    }

    /* GET ALL BANNERS */
    case GET_ALL_BANNERS: {
      return {
        ...state,
        banners: [...action.payload],
        allBanners: [...action.payload],
      };
    }

    /* GET DELETED BANNERS */
    case GET_DELETED_BANNERS: {
      return {
        ...state,
        deletedBanners: [...action.payload],
        banners: [...action.payload],
      };
    }

    /* GET ENABLED BANNERS */
    case GET_ENABLED_BANNERS: {
      return {
        ...state,
        enabledBanners: [...action.payload],
        banners: [...action.payload],
      };
    }

    /* DELETE BANNER */
    case DELETE_BANNER: {
      return { ...state };
    }

    /* RESTORE BANNER */
    case RESTORE_BANNER: {
      return { ...state };
    }

    /* GET USER BY ID */
    case GET_USER_BY_ID: {
      return {
        ...state,
        user: { ...action.payload },
      };
    }

    /* GET USER BY NAME */
    case GET_USER_BY_NAME: {
      if (state.rolFilter === "All roles") {
        return {
          ...state,
          users: action.payload,
          allUsers: action.payload,
          usersByName: action.payload,
          statusFilter: "all",
          currentPage: 1,
        };
      }

      const adminsFilteredNew = state.adminsFiltered;

      return {
        ...state,
        users: adminsFilteredNew,
        allUsers: action.payload,
        usersByName: action.payload,
        statusFilter: "all",
        currentPage: 1,
      };
    }

    /* FILTER BY ROL */
    case FILTER_BY_ROL: {
      if (state.statusFilter === "active") {
        if (action.payload === "All roles") {
          return {
            ...state,
            users: [...state.usersNotBanned],
            rolFilter: action.payload,
            currentPage: 1,
          };
        }
        const usersFiltered = state.usersNotBanned.filter((user) => {
          if (user.rol === action.payload) {
            return user;
          }
        });
        const usersFilteredNew = state.allUsers.filter(
          (user) => user.rol === action.payload
        );
        return {
          ...state,
          users: [...usersFiltered],
          adminsFiltered: usersFilteredNew,
          rolFilter: action.payload,
          currentPage: 1,
        };
      }

      if (state.statusFilter === "banned") {
        if (action.payload === "All roles") {
          return {
            ...state,
            users: [...state.bannedUsers],
            rolFilter: action.payload,
            currentPage: 1,
          };
        }
        const usersFiltered = state.bannedUsers.filter(
          (user) => user.rol === action.payload
        );
        const usersFilteredNew = state.allUsers.filter(
          (user) => user.rol === action.payload
        );
        return {
          ...state,
          users: [...usersFiltered],
          adminsFiltered: usersFilteredNew,
          rolFilter: action.payload,
          currentPage: 1,
        };
      }

      if (action.payload === "All roles") {
        return {
          ...state,
          users: [...state.allUsers],
          rolFilter: action.payload,
          currentPage: 1,
        };
      }
      const usersFiltered = state.allUsers.filter(
        (user) => user.rol === action.payload
      );

      return {
        ...state,
        users: [...usersFiltered],
        adminsFiltered: [...usersFiltered],
        rolFilter: action.payload,
        currentPage: 1,
      };
    }

    /* SET CURRENT PAGE */
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
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

    case AUTH_USER: {
      return {
        ...state,
        authUser: { ...action.payload },
      };
    }

    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };

    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
