import {
  GET_ALL_GAMES,
  GET_BY_NAME_GAMES,
  GET_BY_ID_GAMES,
  RESET_DETAIL_GAMES,
  POST_VIDEOGAME,
  EDIT_VIDEOGAME,
  DELETE_VIDEOGAME,
  ORDER,
  FILTER_PLATFORM,
  FILTER_DEVELOPER,
  FILTER_GENRE,
  GET_ALL_USERS,
  GET_USERS_NOT_BANNED,
  BAN_USER,
  UNBAN_USER,
  GET_USERS_BANNED,
  //
  GET_ORDERS,
  GET_BY_ID_ORDERS,
  RESET_DETAIL_ORDERS,
  CANCELED_ORDER,
  GET_ORDER_CANCELLED,
  RESTORE_ORDER,
  GET_ORDER_ACTIVE,
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
  POST_BANNER_REQUEST,
  POST_BANNER_SUCCESS,
  POST_BANNER_FAILURE,
  GET_USER_BY_ID,
  FILTER_BY_ROL,
  GET_USER_BY_NAME,
  AUTH_USER,
  SET_CURRENT_PAGE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  POST_USER,
  GET_ACTIVE_VIDEOGAMES,
  DELETED_VIDEOGAMES,
  RESTORE_VIDEOGAME,
  GET_USER_BY_EMAIL,
  ADD_SUCCESSFUL_PURCHASE,
  ADD_REJECTED_PURCHASE,
  SET_SHOPPING_CART,
  GET_REVIEWS_OF_GAME,
} from "./action-types";

const initialState = {
  allGames: [],
  allCopyGames: [],
  detailGame: {},
  activeGames: [],
  disabledGames: [],

  allUsers: [],
  users: [],
  usersByName: [],
  usersNotBanned: [],
  usersNotBannedOfi: [],
  bannedUsers: [],
  bannedUsersOfi: [],
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
  game: {
    reviews: [], // Inicialmente, la lista de reviews está vacía.
  },

  allBanners: [],
  banners: [],
  deletedBanners: [],
  enabledBanners: [],
  banner: {},
  bannerCreated: null,

  //Orders:
  allOrders: [],
  orders: [],
  detailOrders: {},
  canceledOrder: [],
  activeOrder: [],

    //! Carrito-Edward
    shoppingCart: [], //Acá traigo todos los productos que voy a comprar
    //! Historial de Compras:
    shopping: {
        approved: [],
        rejected: [],
    },

  loading: true,

  loadingReviews: false,
  errorReviews: null,
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

    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loadingReviews: true,
        errorReviews: null,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loadingReviews: false,
        reviews: action.payload,
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loadingReviews: false,
        errorReviews: action.payload,
      };

    case GET_ALL_GAMES:
      const newStateGetAllGames = {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
        currentPage: 1,
      };
      saveStateToLocalStorage(newStateGetAllGames);
      return newStateGetAllGames;

    case GET_BY_NAME_GAMES:
      const newStateGetByNameGames = {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
        currentPage: 1,
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

    case GET_ACTIVE_VIDEOGAMES: {
      return {
        ...state,
        activeGames: [...action.payload],
      };
    }

    case DELETED_VIDEOGAMES: {
      return {
        ...state,
        disabledGames: [...action.payload],
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

    /* DELETE VIDEOGAME */
    case DELETE_VIDEOGAME: {
      return { ...state };
    }

    /* RESTORE VIDEOGAME */
    case RESTORE_VIDEOGAME: {
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
          usersNotBannedOfi: [...action.payload],
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
          bannedUsersOfi: [...action.payload],
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
    /* POST BANNER */
    case POST_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload,
      };
    case POST_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

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

    case GET_REVIEWS_OF_GAME:
      return {
        ...state,
        game: {
          ...state.game,
          reviews: action.payload, // Asigna las reviews del juego al estado.
        },
      };

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

    /* POST BANNER */
    case POST_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload,
      };
    case POST_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    /////////////////////////////////////////////////////////
    /* GET ALL ORDERS❤ */
    case GET_ORDERS: {
      return {
        ...state,
        orders: [...action.payload],
        allOrders: [...action.payload],
      };
    }

    /*GET ORDERS BY ID❤ */
    case GET_BY_ID_ORDERS:
      let payloadObject =
        typeof action.payload === "object" ? action.payload : {};
      return {
        ...state,
        detailOrders: { ...payloadObject }, // Convertir detailOrders en un objeto
      };
    case RESET_DETAIL_ORDERS:
      return {
        ...state,
        detailOrders: [...action.payload],
      };

    /* Cancelar ordenes❤*/
    case CANCELED_ORDER:
      const canceledOrderId = action.payload;
      //agregado
      const updatedActiveOrderss = state.activeOrder.filter(
        (orderId) => orderId !== canceledOrderId
      );

      const updatedOrders = state?.orders?.map((order) =>
        order.id === canceledOrderId ? { ...order, cancelled: true } : order
      );

      return {
        ...state,
        orders: updatedOrders,

        activeOrder: updatedActiveOrderss,

        canceledOrder: [...state.canceledOrder, canceledOrderId], // Agrega la orden cancelada al estado canceledOrders
      };

    case GET_ORDER_CANCELLED:
      return {
        ...state,
        canceledOrder: action.payload, // Actualiza el estado canceledOrder con las órdenes canceladas
      };

    case RESTORE_ORDER:
      const restoredOrderId = action.payload;

      // Filtra la orden restaurada de canceledOrder
      const updatedCanceledOrders = state.canceledOrder.filter(
        (orderId) => orderId !== restoredOrderId
      );
      const updated = state?.orders?.map((order) =>
        order.id === restoredOrderId ? { ...order, cancelled: false } : order
      );
      return {
        ...state,
        orders: updated,
        canceledOrder: [...updatedCanceledOrders], // Agrega la orden cancelada al estado canceledOrders
        activeOrder: [...state.activeOrder, restoredOrderId],
      };

    case GET_ORDER_ACTIVE:
      return {
        ...state,
        activeOrder: [...action.payload],
      };
    //////////////////////////////////////////////////////////////////

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

    case POST_USER: {
      const newState = {
        ...state,
      };
      return newState;
    }

    case GET_USER_BY_EMAIL: {
      return {
        ...state,
        user: [...action.payload],
      };
    }

    //!Edward
    case SET_SHOPPING_CART:
      //console.log('Reducer:', action.payload)
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case ADD_REJECTED_PURCHASE:
      const newRejectedPurchase = action.payload;

      // Verificar si preferenceId ya existe en el arreglo rejected
      const isUniqueRejected = state.shopping.rejected.every(
        (purchase) => purchase.preferenceId !== newRejectedPurchase.preferenceId
      );

      if (isUniqueRejected) {
        return {
          ...state,
          shopping: {
            ...state.shopping,
            rejected: [...state.shopping.rejected, newRejectedPurchase],
          },
        };
      } else {
        console.log(
          "PreferenceId duplicado, no se agrega al historial de compras rechazadas."
        );
        return state;
      }
    case ADD_SUCCESSFUL_PURCHASE:
      const newSuccessfulPurchase = action.payload;

      // Verificar si preferenceId ya existe en el arreglo approved
      const isUniqueApproved = state.shopping.approved.every(
        (purchase) =>
          purchase.preferenceId !== newSuccessfulPurchase.preferenceId
      );

      if (isUniqueApproved) {
        return {
          ...state,
          shopping: {
            ...state.shopping,
            approved: [...state.shopping.approved, newSuccessfulPurchase],
          },
        };
      } else {
        console.log(
          "PreferenceId duplicado, no se agrega al historial de compras aprobadas."
        );
        return state;
      }
    //!Edward

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
