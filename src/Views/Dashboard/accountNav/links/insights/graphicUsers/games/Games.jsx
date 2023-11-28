import React, { useEffect } from 'react';
import style from '../users/users.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getActiveGames, getDisabledGames } from '../../../../../../../redux/actions';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function Games({ games }) {
    const dispatch = useDispatch()
    const { allGames, disabledGames } = useSelector((state) => state)


    const data = {
        labels: 
                ['Actualmente'],
        datasets: [
            {
                label: 'Juegos habilitados',
                data: [games.length],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Todos los videojuegos',
                data: [allGames.length],
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Juegos desabilitados',
                data: [disabledGames.length],
                backgroundColor: 'purple',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    }

    const options = {}

    useEffect(() => {
        dispatch(getActiveGames())
        dispatch(getDisabledGames())
    }, [])

    return (
        <div className={style.containerBar}>
            <Bar 
                style={
                    {width: '1000px'},
                    {height: '600px'}
                }
                data={data} 
                options={options}
            />
        </div>
  );
}

export default Games;