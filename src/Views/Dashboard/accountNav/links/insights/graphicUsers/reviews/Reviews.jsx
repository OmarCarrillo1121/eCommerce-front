import React, { useEffect } from 'react';
import style from '../users/users.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getActiveGames, getDeletedReviews, getDisabledGames, getEnabledReviews } from '../../../../../../../redux/actions';
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

function Reviews({ reviews }) {
    const dispatch = useDispatch()
    const { deletedReviews, enabledReviews } = useSelector((state) => state)


    const data = {
        labels: 
                ['Actualmente'],
        datasets: [
            {
                label: 'Todas las reviews',
                data: [reviews.length],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Reviews habilitadas',
                data: [enabledReviews.length],
                backgroundColor: 'blue',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Reviews eliminadas',
                data: [deletedReviews.length],
                backgroundColor: 'purple',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    }

    const options = {}

    useEffect(() => {
        dispatch(getEnabledReviews())
        dispatch(getDeletedReviews())
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

export default Reviews;