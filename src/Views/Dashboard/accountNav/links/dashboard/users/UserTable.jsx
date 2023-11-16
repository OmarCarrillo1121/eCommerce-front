import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUsersNotBanned, banUser, unbanUser, getBannedUsers } from "../../../../../../redux/actions";
import style from './userTable.module.css'

const UserTable = () => {
    const { users } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ rol, setRol ] = useState(false)

    const openEditRol = (e) => {
        e.preventDefault()

        setRol(true)
    }

    const closeEditRol = (e) => {
        e.preventDefault()

        setRol(false)
    }

    const handleChange = (e) => {
        const { value } = e.target

        if (value === "All users") {
            dispatch(getAllUsers())
        } else if (value === "Users not Banned"){
            dispatch(getUsersNotBanned())
        } else if (value === "Users Banned") {
            dispatch(getBannedUsers())
        }
    }

    const changeRol = (e) => {
        const { value } = e.target

        
    }

    const banToUser = (id) => {
        dispatch(banUser(id))
    } 

    const unbanToUser = (id) => {
        dispatch(unbanUser(id))
    }

    return (<div className={style.tabletUsers}>
        <div>
            <h2>Users</h2>
            {
                users.length !== 1 
                ? <small>{users.length} users found</small>
                : <small>{users.length} user found</small>
            }
        </div>
        <select name="" onChange={handleChange}>
            <option value="All users">All users</option>
            <option value="Users not Banned">Users not Banned</option>
            <option value="Users Banned">Users Banned</option>
        </select>
        <table>
            <thead>
                <tr className={style.row}>
                    <th>Rol</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Ban</th>
                    <th>UnBan</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length > 0 
                    ? users.map((user) => (
                        <tr className={style.row} key={user.id}>
                            <td className={style.divRol}>
                                <button onClick={openEditRol}>✎</button>
                                <p>{user.rol}</p>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td><button onClick={() => banToUser(user.id)}>Ban</button></td>
                            <td><button onClick={() => unbanToUser(user.id)}>UnBan</button></td>
                        </tr>
                    )): null
                }
            </tbody>
            {
                rol 
                && <div className={style.editRol}>
                    <select name="" onChange={changeRol}>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                </div> 
            }
        </table>
    </div>
    );
};

export default UserTable;