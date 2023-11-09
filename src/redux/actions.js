import axios from "axios";
import { GET_ALL_GAMES, LOADING, URL_GAMES, GET_BY_NAME_GAMES, GET_BY_ID_GAMES, RESET_DETAIL_GAMES, ORDER, FILTER_PLATFORM, FILTER_DEVELOPER, FILTER_GENRE } from "./action-types";

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
    


//!EDWARD
export const orderCards = (order) => {//!Games en orden alfabetico y precio
    return { type: ORDER, payload: order }
}
export const filterPlatform = (parameter) => {
    return { type: FILTER_PLATFORM, payload: parameter };
};
    
export const filterDeveloper = (parameter) => {
    return { type: FILTER_DEVELOPER, payload: parameter }; 
};
    
export const filterGenre = (parameter) => {
    return { type: FILTER_GENRE, payload: parameter };
};
//!EDWARD
