import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from '../../../redux/actions';

export const useGames = () => {
    const dispatch = useDispatch()
    const games = useSelector(state => state.allGames)

    useEffect(() => {
        dispatch(getAllGames())
    },[dispatch])

    return { games }
}