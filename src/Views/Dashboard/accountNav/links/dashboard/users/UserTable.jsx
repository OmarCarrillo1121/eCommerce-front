import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUsersNotBanned, banUser, unbanUser, getBannedUsers, updateUser } from "../../../../../../redux/actions";
import style from './userTable.module.css'
import img from '../../../../../../Assets/img/icon/dashboard/adminboard/person.jpg'
import { NavLink } from 'react-router-dom'

const UserTable = () => {
    const { users } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ rol, setRol ] = useState(false)
    const [ info, setInfo ] = useState(false)
    const [ user, setUser ] = useState({})
    const viewMore = ">>>"

    const openEditRol = (user) => {
        setUser(user)
        setRol(true)
    }

    const closeEditRol = (e) => {
        e.preventDefault()

        setRol(false)
        setUser("")
    }

    const openInfo = (user) => {
        setUser(user)
        setInfo(true)
    }

    const closeInfo = (e) => {
        e.preventDefault()

        setInfo(false)
        setUser("")
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
        const { name, value } = e.target

        if (name === 'rol') {
            setUser({
                ...user,
                rol: value
            })
        }
    }

    const updatedUser = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            id: user.id,
            user
        }))
        setRol(false)
        setUser("")
    }

    const banToUser = (id) => {
        dispatch(banUser(id))
        setInfo(false)
        setUser("")
    } 

    const unbanToUser = (id) => {
        dispatch(unbanUser(id))
        setInfo(false)
        setUser("")
    }

    useEffect(() => {         
        dispatch(getAllUsers())
    }, [])

    return (<>
    <div className={style.tabletUsers}>
        <div>
            <h2>Users</h2>
            {
                users.length !== 1 
                ? <small>{users.length} users found</small>
                : <small>{users.length} user found</small>
            }
        </div>
        <div>
            <select name="" onChange={handleChange}>
                <option value="All users">All users</option>
                <option value="Users not Banned">Users not Banned</option>
                <option value="Users Banned">Users Banned</option>
            </select>
            <select name="" >
                <option value="Admins">Admins</option>
                <option value="Users">Users</option>
            </select>
        </div>
        <table>
            <thead>
                <tr className={style.row}>
                    <th></th>
                    <th>Rol</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Info</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length > 0 
                    ? users.map((user) => (
                        <tr className={style.row} key={user.id}>
                            <td>
                                <button onClick={() => openEditRol(user)}>✎</button>
                            </td>
                            <td>
                                {user.rol}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>
                                {
                                    user.banned 
                                    ? 'Banned'
                                    : 'Active'
                                }
                            </td>
                            <td><button onClick={() => openInfo(user)}>🛈</button></td>
                        </tr>
                    )): null
                }
            </tbody>
        </table>
    </div>
    {
        rol 
        && <div className={style.overlay}>
                <div className={style.editRol}>
                    <div className={style.containerEditUser}>
                        <button onClick={closeEditRol}>X</button>
                        <strong>Do you want to change the role?</strong>
                        <select name="rol" onChange={changeRol} value={user.rol}>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                        <button onClick={updatedUser} className={style.updateBtn}>Save</button>
                    </div>
                </div> 
        </div>
    }
    {
        info 
        && <div className={style.overlay}>
                <div className={style.seeInfo}>
                    <div className={style.containerImg}>
                        <button onClick={closeInfo}>X</button>
                        {
                            user.image === "" 
                            ? <img src={img} alt="person"/>
                            : <img src={user.image} alt={user.name} />
                        }
                        <h3>{user.name}</h3>
                    </div>
                    <div className={style.containerInfo}>
                        <div className={style.details}>
                            <p><span>Role:</span>&nbsp;&nbsp;<b>{user.rol}</b></p>
                            <p><span>Email:</span>&nbsp;&nbsp;<b>{user.email}</b></p>
                            <p><span>Address:</span>&nbsp;&nbsp;<b>{user.address}</b></p>
                        </div>
                        <div className={style.btnStatus}>
                            {
                                user.banned 
                                ?   <button onClick={() => unbanToUser(user.id)}>UnBan</button>
                                :   <button onClick={() => banToUser(user.id)}>Ban</button>
                            }
                        </div>
                        <div className={style.containerBtn}>
                            <div className={`${style.btn} ${style.btn2}`} id="button-2">
                                <div className={style.slideBtn}></div>
                                <NavLink className={style.view} to={`/user/${user.id}`}>
                                    View more <small>{viewMore}</small>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    }
    </>);
};

export default UserTable;