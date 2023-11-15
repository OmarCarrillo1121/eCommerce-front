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
} from "./action-types";
import { getInitialState } from "./reducer"



export const loading = (stateLoading) =>({
  type:LOADING ,
  payload : stateLoading,
});

export const getAllGamesSuccess = ( data ) =>({
  type:GET_ALL_GAMES,
  payload : data,
});

export const getByNameSuccess = ( data ) => ({
  type:GET_BY_NAME_GAMES,
  payload : data,
});
export const getByIdSuccess = (data) =>({
  type:GET_BY_ID_GAMES,
  payload : data,
});

export const resetDetailGames = () =>({
  type:RESET_DETAIL_GAMES,
});

export const orderCards = (order) => ({
  type: ORDER,
  payload: order,
});

export const filterPlatform = (parameter) => ({
  type: FILTER_PLATFORM,
  payload: parameter,
});

export const filterDeveloper = (parameter) => ({
  type: FILTER_DEVELOPER,
  payload: parameter,
});

export const filterGenre = (parameter) => ({
  type: FILTER_GENRE,
  payload: parameter,
});

export const postVideogameSuccess = () => ({
  type: POST_VIDEOGAME,
});

export const editVideogameSuccess = () => ({
  type: EDIT_VIDEOGAME,
});

export const getAllGames = () =>{
  return async function (dispacth){
    try{
      dispacth(loading(true));
      const response = await axios(`${URL_GAMES}/videogames`);
      dispacth (getAllGamesSuccess(response.data))
      
      const currentState = {
        allGames: response.data,
        allCopyGames: response.data,
        detailGame: null,
        loading: false,
    };
    localStorage.setItem('yourGameState', JSON.stringify(currentState));
  }catch(error){
    console.log("Error", error.message);
  } finally{
    dispacth(loading(false))
  }
}
}

export const getByName = (name) => {
  return function (dispatch) {
    dispatch(loading(true));

    if (!name || !name.trim()) {
      dispatch(loading(false));
      return;
    }

    axios(`${URL_GAMES}/videogames/?name=${encodeURIComponent(name)}`)
      .then((response) => {
        dispatch(getByNameSuccess(response.data));
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

      dispatch(getByIdSuccess(response.data));

      const currentState = {
        ...getInitialState(),
        detailGame: response.data,
      };

      localStorage.setItem("yourGameState", JSON.stringify(currentState));
    } catch (error) {
      console.log("Error" + error.message);
    } finally {
      dispatch(loading(false));
    }
  };
};

export const postVideogame = (videogame) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL_GAMES}/videogames`, videogame);
      alert("Videogame created successfully!");

      dispatch(postVideogameSuccess());
    } catch (error) {
      alert(error.message);
    }
  };
};

export const editVideogame = ({ id, videogame }) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL_GAMES}/videogames/${id}`, videogame);

      dispatch(editVideogameSuccess());
    } catch (error) {
      alert(error.message);
    }
  };
};





// export const loading = (stateLoading) => {
//   return {
//     type: LOADING,
//     payload: stateLoading,
//   };
// };

// export const getAllGames = () => {
//   return async function (dispatch) {
//     try {
//       dispatch(loading(true));

//       const response = await axios(`${URL_GAMES}/videogames`);

//       return dispatch({
//         type: GET_ALL_GAMES,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log("Error", error.message);
//     } finally {
//       dispatch(loading(false));
//     }
//   };
// };

// export const getByName = (name) => {
//   return function (dispatch) {
//     dispatch(loading(true));
//     if (!name || !name.trim()) {
//       dispatch(loading(false));
//       return;
//     }
//     axios(`${URL_GAMES}/videogames/?name=${encodeURIComponent(name)}`)
//       .then((response) => {
//         dispatch({
//           type: GET_BY_NAME_GAMES,
//           payload: response.data,
//         });
//       })
//       .catch((error) => {
//         console.log("Axios error:", error.message);
//       })
//       .finally(() => {
//         dispatch(loading(false));
//       });
//   };
// };

// export const getByGamesDetail = (id) => {
//   return async function (dispatch) {
//     try {
//       dispatch(loading(true));
//       const response = await axios(`${URL_GAMES}/videogames/${id}`);
//       return dispatch({
//         type: GET_BY_ID_GAMES,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log("Error" + error.message);
//     } finally {
//       dispatch(loading(false));
//     }
//   };
// };
// export const resetDetailGames = () => {
//   return {
//     type: RESET_DETAIL_GAMES,
//   };
// };

// //!EDWARD
// export const orderCards = (order) => {
//   //!Games en orden alfabetico y precio
//   return { type: ORDER, payload: order };
// };
// export const filterPlatform = (parameter) => {
//   return { type: FILTER_PLATFORM, payload: parameter };
// };

// export const filterDeveloper = (parameter) => {
//   return { 
//     type: FILTER_DEVELOPER, 
//     payload: parameter 
//   };
// };

// export const filterGenre = (parameter) => {
//   return { 
//     type: FILTER_GENRE, 
//     payload: parameter 
//   };
// };
// //!EDWARD

// /* POST VIDEOGAME */
// export const postVideogame = (videogame) => {
//   return async (dispatch) => {
//     try {
//       await axios.post(`${URL_GAMES}/videogames`, videogame);
//       alert("Videogame created succesfully!");

//       return dispatch({
//         type: POST_VIDEOGAME,
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };

// /* EDIT VIDEOGAME */
// export const editVideogame = ({ id, videogame }) => {
//   return async (dispatch) => {
//     try {
//       await axios.put(`${URL_GAMES}/videogames/${id}`, videogame);

//       return dispatch({
//         type: EDIT_VIDEOGAME,
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };
