
import {  GET_ALL_GAMES, GET_BY_NAME_GAMES} from "./action-types"


const initialState ={
    allGames : [],
    allCopyGames : [],
    loading: true,
}



const reducer = (state= initialState, action) =>{

    switch(action.type){

        case GET_ALL_GAMES:

            return{
                ...state,
                allGames : action.payload,
                allCopyGames : action.payload,
                loading: false,
            };

        case GET_BY_NAME_GAMES:

            return{
                ...state,
                allGames: action.payload,
                allCopyGames: action.payload,
                loading: false,
            };

        default:
            
            return{
                ...state,
            }
    }
};
            

export default reducer;