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
} from "./action-types";


export const saveStateToLocalStorage = () => {
  return (dispatch, getState) => {
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


export const postVideogame = (videogame) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL_GAMES}/videogames`, videogame);
      alert("Videogame created succesfully!");

      dispatch(saveStateToLocalStorage())

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

      return dispatch({
        type: EDIT_VIDEOGAME,
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
      const response = await axios.get(`${URL_GAMES}/users/all`)

      return dispatch({
        type: GET_ALL_USERS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET USERS NOT BANNED */
export const getUsersNotBanned = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/`)

      return dispatch({
        type: GET_USERS_NOT_BANNED,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET BANNED USERS */
export const getBannedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/users/disabled`)

      return dispatch({
        type: GET_USERS_BANNED,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* BAN USER */
export const banUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/users/${userId}`)

      return dispatch({
        type: BAN_USER
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* UNBAN USERS */
export const unbanUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/users/${userId}/restore`)

      return dispatch({
        type: UNBAN_USER
      })
    } catch (error) {
      alert(error.message)
    }
  }
}