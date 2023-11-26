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
  UPDATE_USER,

  GET_ALL_REVIEWS,
  GET_DELETED_REVIEWS,
  GET_ENABLED_REVIEWS,
  // GET_REVIEWS_OF_GAME,
  // GET_REVIEWS_OF_USER,
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
  FETCH_REVIEWS_FAILURE
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

/* POST VIDEOGAMES */
export const postVideogame = (videogame) => {
  return async (dispatch) => {
    try {
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

      return dispatch({
        type: UPDATE_USER,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

/* GET ALL REVIEWS */
export const getAllReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/all`)

      return dispatch({
        type: GET_ALL_REVIEWS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET DELETED REVIEWS */
export const getDeletedReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/disabled`)

      return dispatch({
        type: GET_DELETED_REVIEWS,
        payload: response.data
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* GET ENABLED REVIEWS */
export const getEnabledReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL_GAMES}/reviews/enabled`)

      return dispatch({
        type: GET_ENABLED_REVIEWS,
        payload: response.data
      })
    } catch (error) {
      alert (error.message)
    }
  }
}

/* DELETE REVIEWS */
export const deleteReview = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL_GAMES}/reviews/ban/${id}`)

      return dispatch({
        type: DELETE_REVIEW
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

/* RESTORE REVIEW */
export const restoreReview = (id) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/reviews/unban/${id}`)

      return dispatch({
        type: RESTORE_REVIEW
      })
    } catch (error) {
      alert(error.message)
    }
  }
}

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
      payload: pageNum
  }
}

/* AUTH_USER */
export const authUser = (user) => {
  return {
    type: AUTH_USER,
    payload: user,
  };
};


const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

export const fetchReviews = (gameId) => {
  return async (dispatch) => {
    dispatch(fetchReviewsRequest());
    try {
      const response = await axios.get(
        `https://ecomercestorebacken.vercel.app/reviews/videogame/${gameId}`
      );
      dispatch(fetchReviewsSuccess(response.data));
    } catch (error) {
      dispatch(fetchReviewsFailure(error.message));
    }
  };
};