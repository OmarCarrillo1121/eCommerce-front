import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames, getByGamesDetail } from '../../../redux/actions';

export const useGames = (id) => {
    const dispatch = useDispatch()
    const games = useSelector(state => state.detailGame)
    const game = useSelector(state => state.allGames)
    useEffect(() => {
        if (id) dispatch(getByGamesDetail(id))
        else dispatch(getAllGames())
    },[dispatch, id])
    
    if (id) return { games }
    else return { games: game }
}