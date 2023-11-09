import {  GET_ALL_GAMES, GET_BY_NAME_GAMES, GET_BY_ID_GAMES, RESET_DETAIL_GAMES,ORDER, FILTER_PLATFORM, FILTER_DEVELOPER, FILTER_GENRE} from "./action-types"


const initialState = {
  allGames: [],
  allCopyGames: [],
  detailGame: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
      };

    case GET_BY_NAME_GAMES:
      return {
        ...state,
        allGames: action.payload,
        allCopyGames: action.payload,
        loading: false,
      };

        case GET_BY_ID_GAMES:
            const { gamesId } = action.payload
            return{
                ...state,
                detailGame: action.payload,
                gamesId,
                loading: false,
            }
        case RESET_DETAIL_GAMES:

        return{
            ...state,
            detailGame:null,
            loading:false,
        }

        //!EDWARD
        case ORDER:
            const copiAllGames = [...state.allGames]//Copia de all games
            const orden =(payload) => {
                console.log(payload)
                if(payload==='A') copiAllGames.sort((a, b) => a.name.localeCompare(b.name))
                if(payload==='B') copiAllGames.sort((a, b) => b.name.localeCompare(a.name))
                if (payload === 'priceLowToHigh') {copiAllGames.sort((a, b) => a.price - b.price);}
                if (payload === 'priceHighToLow') {copiAllGames.sort((a, b) => b.price - a.price);}
            }
            orden(action.payload)
            console.log(copiAllGames)
            return {
                ...state,
                allGames: copiAllGames

            }
            case FILTER_PLATFORM:
                console.log('FILTRO PLATAFORMA',action.payload)
                const filterPlatform = state.allCopyGames.filter(game => action.payload.includes(game.platform));
                console.log('Juegos PLATAFORMA',filterPlatform)

                    return {
                    ...state,
                    allGames: filterPlatform
                };

                case FILTER_DEVELOPER:
                    console.log('FILTRO DEVELOPER', action.payload);
                    const filterDeveloper = state.allCopyGames.filter(game => action.payload.includes(game.developer));
                    console.log('Juegos DEVELOPER', filterDeveloper);
                    return {
                        ...state,
                        allGames: filterDeveloper,
                };

                case FILTER_GENRE:
                    console.log('FILTRO GÉNERO', action.payload);
                    const filterGenre = state.allCopyGames.filter(game => action.payload.includes(game.genre));
                    console.log('Juegos  GÉNERO', filterGenre);
                    return {
                        ...state,
                        allGames: filterGenre,
                };


        //!FIN EDWARD 


        default:
            
            return{
                ...state,
            }
    }
  }

export default reducer;
