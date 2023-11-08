import axios from "axios";
import {
  GET_ALL_GAMES,
  LOADING,
  URL_ALL_GAMES,
  GET_BY_NAME_GAMES,
} from "./action-types";

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

      const response = await axios(`${URL_ALL_GAMES}`);
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
  return async function (dispatch) {
    try {
      dispatch(loading(true));
      if (!name || isNaN(name) || !name.length) {
        return;
      }

      const response = await axios(`${URL_ALL_GAMES}?name=${name}`);
      console.log("Response from getByName action:", response.data);
      return {
        type: GET_BY_NAME_GAMES,
        payload: response.data,
      };
    } catch (error) {
      console.log("Error al buscar por nombre" + error.message);
    } finally {
      dispatch(loading(false));
    }
  };
};
