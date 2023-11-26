import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, getUsersNotBanned, banUser, unbanUser, getBannedUsers, updateUser, filterByRol, getUserByName, setCurrentPage } from "../../../../../../redux/actions";
import style from './userTable.module.css'
import Rol from "./rol/Rol";
import Info from "./info/Info";
import Select from "./selects/Select";
import NotUser from "./notUsers/NotUser"
import Pagination from "../pagination/Pagination";

const UserTable = () => {
    const { users, currentPage } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [ rol, setRol ] = useState(false)
    const [ info, setInfo ] = useState(false)
    const [ user, setUser ] = useState({})
    const [ name, setName ] = useState("")
    const [ time, setTime ] = useState(false)
    const rolSelect = document.querySelector("#rolSelect");
    const statusSelect = document.querySelector("#statusSelect"); 
    const viewMore = ">>>"

    /* SET CURRENT PAGE */
    const usersPerPage = 10;
    const totalUsers = users.length

    const firstIndex = usersPerPage * (currentPage - 1)
    const lastIndex = firstIndex + usersPerPage

    let currentPageData = users.slice(firstIndex, lastIndex)


    const onPageChange  = (pageNum) => {
        dispatch(setCurrentPage(pageNum))
    }

    /* ---------------- */

    const lookAtName = (e) => {
        const { value } = e.target

        if (value === "") {
            dispatch(getAllUsers())
        }
        setName(value)
    }

    const searchToUser = (e) => {
        e.preventDefault()

        dispatch(getUserByName(name))
        setTime(true)

        if (rolSelect.value !== "All roles") {
            rolSelect.value = "All roles";
        }

        if (statusSelect.value !== "All users") {
            statusSelect.value = "All users";
        }
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
            if (time) {
                dispatch(getUserByName(name))
            } else {
                dispatch(getAllUsers())
            }
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

        setName("")
        if (rolSelect.value !== "All roles") {
            rolSelect.value = "All roles";
        }

        if (statusSelect.value !== "All users") {
            statusSelect.value = "All users";
        }

        dispatch(getAllUsers())
        setTime(false)
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
        <Select
            filterRol={filterRol}
            handleChange={handleChange}
        />
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
                    currentPageData.length > 0 
                    ? currentPageData.map((user, index) => {
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
                    }): <NotUser/>
                }
            </tbody>
        </table>
        <Pagination
            totalUsers={totalUsers}
            currentPage={currentPage}
            pageSize={usersPerPage}
            onPageChange={onPageChange}
        />
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
    {rol && <Rol
       user={user}
       closeEditRol={closeEditRol}
       changeRol={changeRol}
       updatedUser={updatedUser} /> 
    }
    { info && <Info
        user={user}
        closeInfo={closeInfo}
        unbanToUser={unbanToUser}
        banToUser={banToUser}
        viewMore={viewMore}
    /> 
    }
    </>);
};

export default UserTable;