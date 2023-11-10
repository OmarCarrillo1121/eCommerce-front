import axios from "axios";
import { LOADING, URL_GAMES, GET_ALL_GAMES, GET_BY_NAME_GAMES, GET_BY_ID_GAMES, RESET_DETAIL_GAMES, POST_VIDEOGAME, EDIT_VIDEOGAME } from "./action-types";

export const loading = (stateLoading) =>{
    return{
        type:LOADING,
        payload: stateLoading
    }
}


export const getAllGames = () =>{

    return async function (dispatch){

        try {
        
            dispatch(loading(true))

            const response = await axios(`${URL_GAMES}/videogames`);

            return dispatch({
                type: GET_ALL_GAMES, 
                payload: response.data
                 
            })
            
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            dispatch(loading(false));
        }
            
        }
    }

export const getByName = (name) =>{

    return async function (dispatch){

        try {
            
            dispatch(loading(true))
                if(!name || isNaN(name) || !name.length){
                    return
                }

                const response = await axios(`${URL_GAMES}/videogames?name=${name}`);

               return  dispatch({
                    type: GET_BY_NAME_GAMES, 
                    payload: response.data
                })
            } catch (error){
                console.log("Error al buscar por nombre" + error.message )
            }finally{
                dispatch(loading(false));
            }
        }
    }

export const getByGamesDetail = (id) =>{
    return async function (dispatch){
        try {
            dispatch(loading(true))
            const response = await axios(`${URL_GAMES}/videogames/${id}`)
            return dispatch({
                type: GET_BY_ID_GAMES,
                payload: response.data
            })

            
        } catch (error) {
            console.log('Error' + error.message );
        } finally {
            dispatch(loading(false));
        }

    }
}

export const resetDetailGames = () =>{
    return{

        type: RESET_DETAIL_GAMES,

    }
}
    

/* POST VIDEOGAME */
export const postVideogame = (videogame) => {
    return async (dispatch) => {
        try {
            await axios.post(`${URL_GAMES}/videogames`, videogame)
            alert("Videogame created succesfully!")
            
            return dispatch({
                type: POST_VIDEOGAME
            })
        } catch(error){
            alert(error.message)
        }
    }
}

/* EDIT VIDEOGAME */
export const editVideogame = (id, videogame) => {
    return async (dispatch) => {
        try {
            await axios.put(`${URL_GAMES}/videogames/${id}`, videogame)

            return dispatch({
                type: EDIT_VIDEOGAME,
            })
        } catch (error){
            alert(error.message)
        }
    }
}