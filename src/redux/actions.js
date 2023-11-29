import axios from "axios";
import {
  LOADING,
  //VIDEOGAMES
  URL_GAMES,
  GET_ALL_GAMES,
  GET_BY_NAME_GAMES,
  GET_BY_ID_GAMES,
  RESET_DETAIL_GAMES,
  POST_VIDEOGAME,
  EDIT_VIDEOGAME,
  FILTER_PLATFORM,
  FILTER_DEVELOPER,
  FILTER_GENRE,
  GET_ACTIVE_VIDEOGAMES,
  DELETED_VIDEOGAMES,
  DELETE_VIDEOGAME,
  RESTORE_VIDEOGAME,

  //USERS
  GET_ALL_USERS,
  GET_USERS_BANNED,
  GET_USERS_NOT_BANNED,
  BAN_USER,
  UNBAN_USER,
  UPDATE_USER,
  GET_USER_BY_EMAIL,

  //ORDERS
  ORDER,
  GET_ORDERS,
  GET_BY_ID_ORDERS,
  RESET_DETAIL_ORDERS,
  EDIT_ORDERS,
  CANCELED_ORDER,
  GET_ORDER_CANCELLED,
  RESTORE_ORDER,
  GET_ORDER_ACTIVE,

  //REVIEWS
  GET_ALL_REVIEWS,
  GET_DELETED_REVIEWS,
  GET_ENABLED_REVIEWS,
  GET_REVIEWS_OF_GAME,
  // GET_REVIEWS_OF_USER,
  DELETE_REVIEW,
  RESTORE_REVIEW,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE,

  //BANNERS
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
  POST_BANNER_REQUEST,
  POST_BANNER_SUCCESS,
  POST_BANNER_FAILURE,
  
  
  SET_SHOPPING_CART,
  ADD_REJECTED_PURCHASE,
  ADD_SUCCESSFUL_PURCHASE,
} from "./action-types";

export const saveStateToLocalStorage = () => {
  return (getState) => {
    try {
      const state = getState();
      const serializedState = JSON.stringify(state);
      localStorage.setItem("appState", serializedState);
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  };
};

export const loading = (stateLoading) => {
  return {
    type: LOADING,
    payload: stateLoading,
  };
};

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));

      const response = await axios(`${URL_GAMES}/videogames`);

      return dispatch({
        type: GET_ALL_GAMES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      dispatch(loading(false));
    }
  };
};

export const getByName = (name) => {
  return function (dispatch) {
    dispatch(loading(true));
    if (!name || !name.trim()) {
      dispatch(loading(false));
      return;
    }
    axios(`${URL_GAMES}/videogames/all?name=${encodeURIComponent(name)}`)
      .then((response) => {
        dispatch({
          type: GET_BY_NAME_GAMES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("Axios error:", error.message);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};

export const deleteVideogame = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${URL_GAMES}/videogames/${id}`);

      alert("Juego desabilitado exitosamente!!");
      return dispatch({
        type: DELETE_VIDEOGAME,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const restoreVideogame = (id) => {
  return async function (dispatch) {
    try {
      await axios.put(`${URL_GAMES}/videogames/restore/${id}`);

      alert("Juego habilitado exitosamene");
      return dispatch({
        type: RESTORE_VIDEOGAME,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getByGamesDetail = (id) => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      const response = await axios(`${URL_GAMES}/videogames/${id}`);
      return dispatch({
        type: GET_BY_ID_GAMES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error" + error.message);
    } finally {
      dispatch(loading(false));
    }
  };
};
export const resetDetailGames = () => {
  return {
    type: RESET_DETAIL_GAMES,
  };
};

//!EDWARD
export const orderCards = (order) => {
  //!Games en orden alfabetico y precio
  return { type: ORDER, payload: order };
};
export const filterPlatform = (parameter) => {
  return { type: FILTER_PLATFORM, payload: parameter };
};

export const filterDeveloper = (parameter) => {
  return { type: FILTER_DEVELOPER, payload: parameter };
};

export const filterGenre = (parameter) => {
  return { type: FILTER_GENRE, payload: parameter };
};

/* POST VIDEOGAMES */
export const postVideogame = (videogame) => {
  return async (dispatch) => {
    try {
      console.log(videogame);
      await axios.post(`${URL_GAMES}/videogames`, videogame);
      alert("Videogame created succesfully!");

      dispatch(saveStateToLocalStorage());

      return dispatch({
        type: POST_VIDEOGAME,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* EDIT VIDEOGAME */
export const editVideogame = ({ id, videogame }) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/videogames/${id}`, videogame);

      alert("Videogame edited successfully");
      return dispatch({
        type: EDIT_VIDEOGAME,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET ACTIVE VIDEOGAMES */
export const getActiveGames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/videogames/all`);

      return dispatch({
        type: GET_ACTIVE_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET DISABLED VIDEOGAMES */
export const getDisabledGames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/videogames/disabled`);

      return dispatch({
        type: DELETED_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET ALL USERS */
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/all`);

      return dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET USERS NOT BANNED */
export const getUsersNotBanned = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/`);

      return dispatch({
        type: GET_USERS_NOT_BANNED,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET BANNED USERS */
export const getBannedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/disabled`);

      return dispatch({
        type: GET_USERS_BANNED,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* BAN USER */
export const banUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/users/${userId}`);

      return dispatch({
        type: BAN_USER,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* UNBAN USERS */
export const unbanUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/users/${userId}/restore`);

      return dispatch({
        type: UNBAN_USER,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* UPDATE USER */
export const updateUser = ({ id, user }) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/users/${id}`, user);

      alert('Usuario editado con éxito')
      dispatch({
        type: UPDATE_USER,
      });
      dispatch(saveStateToLocalStorage());
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET ALL REVIEWS */
export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/all`);

      return dispatch({
        type: GET_ALL_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET DELETED REVIEWS */
export const getDeletedReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/disabled`);

      return dispatch({
        type: GET_DELETED_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET ENABLED REVIEWS */
export const getEnabledReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/enabled`);

      return dispatch({
        type: GET_ENABLED_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* DELETE REVIEWS */
export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/reviews/ban/${id}`);

      return dispatch({
        type: DELETE_REVIEW,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* RESTORE REVIEW */
export const restoreReview = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/reviews/unban/${id}`);

      return dispatch({
        type: RESTORE_REVIEW,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET GAME REVIEWS */
export const getGameReviews = (videogameId) => {
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      const response = await axios(`${URL_GAMES}/reviews/${videogameId}`);
      return dispatch({
        type: GET_REVIEWS_OF_GAME,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error" + error.message);
    } finally {
      dispatch(loading(false));
    }
  };
};

export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

export const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

export const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

// Acción para crear una nueva review
export const postReviewRequest = () => ({
  type: POST_REVIEW_REQUEST,
});

export const postReviewSuccess = (review) => ({
  type: POST_REVIEW_SUCCESS,
  payload: review,
});

export const postReviewFailure = (error) => ({
  type: POST_REVIEW_FAILURE,
  payload: error,
});

// Función asincrónica para manejar la creación de la review
export const postReview = (newReview) => async (dispatch) => {
  try {
    dispatch(postReviewRequest());

    // Realiza la llamada a la API para crear la review
    const response = await fetch('https://ecomercestorebacken.vercel.app/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      throw new Error('No se pudo crear la review');
    }

    const data = await response.json();

    dispatch(postReviewSuccess(data));
  } catch (error) {
    dispatch(postReviewFailure(error));
  }
};

/* GET ALL BANNERS */
export const getAllBanners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/banners/all`)

      return dispatch({
        type: GET_ALL_BANNERS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}
/* POST BANNER */
const postBannerRequest = () => ({
  type: POST_BANNER_REQUEST,
});

const postBannerSuccess = (data) => ({
  type: POST_BANNER_SUCCESS,
  payload: data,
});

const postBannerFailure = (error) => ({
  type: POST_BANNER_FAILURE,
  payload: error,
});

export const postBanner = (bannerData) => {
  return async (dispatch) => {
    dispatch(postBannerRequest());

    try {
      const response = await axios.post(`${URL_GAMES}/banners`, bannerData);
      dispatch(postBannerSuccess(response.data));
    } catch (error) {
      dispatch(postBannerFailure(error.message));
    }
  };
};

/* DELETE BANNER */
export const deleteBanner = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/banners/ban/${id}`)

      return dispatch({
        type: DELETE_BANNER
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* RESTORE BANNER */
export const restoreBanner = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/banners/unban/${id}`)

      return dispatch({
        type: RESTORE_BANNER
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET DELETED BANNERS */
export const getDeletedBanners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/banners/deleted`)

      return dispatch({
        type: GET_DELETED_BANNERS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET ENABLED BANNERS */
export const getEnabledBanners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/banners/enabled`)

      return dispatch({
        type: GET_ENABLED_BANNERS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/${id}`);

      return dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* FILTER BY ADMIN */
export const filterByRol = (role) => {
  return {
    type: FILTER_BY_ROL,
    payload: role,
  };
};

/* FILTER BY USER */
export const getUserByName = (name) => {
  return async (dispatch) => {
    try {
      if (name) {
        const response = await axios.get(
          `${URL_GAMES}/users/search/name?name=${name}`
        );

        return dispatch({
          type: GET_USER_BY_NAME,
          payload: response.data,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

/* SET CURRENT PAGE */
export const setCurrentPage = (pageNum) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNum,
  };
};

//❤Get Orders:
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/orders`);

      return dispatch({
        type: GET_ORDERS,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//❤Canceled Order:
export const canceledOrder = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/orders/cancel/${id}`);
      dispatch(getActiveOrders());
      dispatch({
        type: CANCELED_ORDER,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

//❤Get orders cancelled:
export const getOrderCancelled = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/orders/cancel`);

      return dispatch({
        type: GET_ORDER_CANCELLED,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//❤restore order:
export const restoreOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${URL_GAMES}/orders/restore/${id}`);

      dispatch({
        type: RESTORE_ORDER,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//❤get Active Orders:
export const getActiveOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/orders/active`);

      dispatch({
        type: GET_ORDER_ACTIVE,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//❤EditOrders:
export const editOrders = ({ id, orders }) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/orders/${id}`, orders);
      return dispatch({
        type: EDIT_ORDERS,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

//❤Orders By Id:
export const getByIdOrders = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_GAMES}/orders/${id}`);
      console.log(response.data);
      return dispatch({
        type: GET_BY_ID_ORDERS,
        payload: response.data,
      });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
};
export const resetDetailOrders = () => {
  return { type: RESET_DETAIL_ORDERS, payload: [] };
};

/* AUTH_USER */
export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user,
  };
};
/* POST_USER */
export const postUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL_GAMES}/users`, user);
      alert("User created succesfully!");

      dispatch(saveStateToLocalStorage());

      return dispatch({
        type: POST_VIDEOGAME,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET_USER_BY_EMAIL */
export const getUserByEmail = (userEmail) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL_GAMES}/users/search/email?email=${userEmail}`
      );

      return dispatch({
        type: GET_USER_BY_EMAIL,
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};
//!Edward

export const setShoppingCart = (games) => {
  return { type: SET_SHOPPING_CART, payload: games };
};
export const addRejectedPurchase = (rejectedPurchase) => {
  //console.log('actions',rejectedPurchase)
  return { type: ADD_REJECTED_PURCHASE, payload: rejectedPurchase };
};

export const addSuccessfulPurchase = (successfulPurchase) => {
  //console.log('actions', successfulPurchase);
  return { type: ADD_SUCCESSFUL_PURCHASE, payload: successfulPurchase };
};
//!Edward
