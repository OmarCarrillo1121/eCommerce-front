import style from './dashboard.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../../../redux/actions';
import UserTable from './users/UserTable';

export function Dashboard() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (  
        <>
            <div className={style.graphics}></div>
            <div className={style.tablet}>
                <UserTable/>
            </div>
        </>
    );
}

