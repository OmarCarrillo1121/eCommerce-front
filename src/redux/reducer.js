import {
  GET_ALL_GAMES,
  GET_BY_NAME_GAMES,
  GET_BY_ID_GAMES,
  RESET_DETAIL_GAMES,
} from "./action-types";

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
      const { gamesId } = action.payload;
      return {
        ...state,
        detailGame: action.payload,
        gamesId,
        loading: false,
      };
    case RESET_DETAIL_GAMES:
      return {
        ...state,
        detailGame: null,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
