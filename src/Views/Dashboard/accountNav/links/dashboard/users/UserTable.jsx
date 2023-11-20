import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUsersNotBanned, banUser, unbanUser, getBannedUsers, updateUser, filterByRol, getUserByName } from "../../../../../../redux/actions";
import style from './userTable.module.css'
import img from '../../../../../../Assets/img/icon/dashboard/adminboard/person.jpg'
import { NavLink } from 'react-router-dom'

const UserTable = () => {
    const { users } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ rol, setRol ] = useState(false)
    const [ info, setInfo ] = useState(false)
    const [ user, setUser ] = useState({})
    const [ name, setName ] = useState("") 
    const viewMore = ">>>"

    const lookAtName = (e) => {
        const { value } = e.target

        setName(value)
    }

    const searchToUser = (e) => {
        e.preventDefault()

       dispatch(getUserByName(name))
       setName("")
    }

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

    const filterRol = (e) => {
        dispatch(filterByRol(e.target.value))
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

    const showAllUsers = (e) => {
        e.preventDefault()

        const rolSelect = document.querySelector("#rolSelect");
        const statusSelect = document.querySelector("#statusSelect");

        if (rolSelect.value !== "All roles") {
            rolSelect.value = "All roles";
        }

        if (statusSelect.value !== "All users") {
            statusSelect.value = "All users";
        }

        dispatch(getAllUsers())
    }

    useEffect(() => {         
        dispatch(getAllUsers())
    }, [])

    return (<>
    <div className={style.tabletUsers}>
        <div className={style.searchbar}>
            <input  type="text" value={name} onChange={lookAtName} placeholder="Search for a user"/>
            <button onClick={searchToUser}>🔍︎</button>
        </div>
        <div className={style.containerSelect}>
            <div>
                <b>Rol: </b>
                <select id="rolSelect" onChange={filterRol}>
                    <option value="All roles">All</option>
                    <option value="admin">Admins</option>
                    <option value="user">Users</option>
                </select>
            </div>
            <div>
                <b>Status: </b>
                <select id="statusSelect" onChange={handleChange}>
                    <option value="All users">All</option>
                    <option value="Users not Banned">Active</option>
                    <option value="Users Banned">Banned</option>
                </select>
            </div>
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
                    ? users.map((user, index) => {
                        const rowClass = index % 2 === 0 ? style['rowEven'] : style['rowOdd']

                        return (
                            <tr className={`${style.row} ${rowClass}`} key={user.id}>
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
                        )
                    }): null
                }
            </tbody>
        </table>
        <div className={style.containerMessage}>
            <p><b>Didn't find what are looking for?</b> Some users may be hidden because of the filters you've selected.</p>
            <button className={style.showUsers} onClick={showAllUsers}>Show all users</button>
            {
                users.length !== 1 
                ? <small>{users.length} users found</small>
                : <small>{users.length} user found</small>
            }
        </div>
    </div>
    {
        rol 
        && <div className={style.overlay}>
                <div className={style.editRol}>
                    <div className={style.containerEditUser}>
                        <button onClick={closeEditRol}>X</button>
                        <strong>Do you want to change the role of {user.name}?</strong>
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