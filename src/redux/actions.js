import axios from "axios";
import {
  GET_ALL_GAMES,
  LOADING,
  URL_GAMES,
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
  GET_USERS_BANNED,
  GET_USERS_NOT_BANNED,
  BAN_USER,
  UNBAN_USER,
  GET_ORDERS,
  GET_BY_ID_ORDERS,
  RESET_DETAIL_ORDERS,
  EDIT_ORDERS,
  CANCELED_ORDER,
  GET_ORDER_CANCELLED,
  RESTORE_ORDER,
  GET_ORDER_ACTIVE,
  UPDATE_USER,
  GET_USER_BY_ID,
  FILTER_BY_ROL,
  GET_USER_BY_NAME,
  AUTH_USER,
  SET_CURRENT_PAGE,
  POST_USER,
  GET_ALL_BANNED_USERS,
  GET_ACTIVE_VIDEOGAMES,
  DELETED_VIDEOGAMES,
  DELETE_VIDEOGAME,
  RESTORE_VIDEOGAME,
  GET_USER_BY_EMAIL,
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

/* GET USER BY ID */
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
