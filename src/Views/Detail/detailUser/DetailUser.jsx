import { useEffect, useState } from "react";
import { getByGamesDetail, getByName, getOrderByIdUser, getReviewsByUser, getUserById, updateUser } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import style from './detailUser.module.css'
import img from '../../../Assets/img/icon/dashboard/usuario.png'
import AsideUser from "./AsideUser/AsideUser";
import { validation } from './validation.js';

function DetailUser() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user, ordersUser, reviewsByUser} = useSelector((state) => state)
    const [ newUser, setNewUser ] = useState({})
    const [ errors, setErrors ] = useState({})

    const [ imgTime, setImgTime ] = useState(false)
    const [ newImg, setNewImg ] = useState("")
    const [ infoTime, setInfoTime ] = useState(false)
    const [ orderTime, setorderTime] = useState(false)
    /* UPDATE IMAGE FUNCTIONS */

    const openEditImgUser = (user) => {
        setNewUser(user)
        setNewImg(user.image)
        setImgTime(true)
    }

    const closeEditImgUser = (e) => {
        e.preventDefault()

        setNewImg(user.image)
        setImgTime(false)
        setNewUser("")
        setErrors({})
    }

    const uploadImg = async(e) => {
        const files = e.target.files
        const data = new FormData()
        
        data.append("file", files[0])
        data.append("upload_preset", "vifx4gqq")

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/dvivroqoe/image/upload`,
            {
                method: "POST",
                body: data,
            }
        )
        const file = await res.json()

        setNewImg(file.secure_url)
        setErrors(validation({
            ...newUser,
            image: file.secure_url
        }))
        setNewUser({
            ...newUser,
            image: file.secure_url
        })
    }

    const updateImg = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            id: user.id,
            user: newUser
        }))
        setImgTime(false)
        setNewUser("")
    }

    /* UPDATE USER INFO */
    const openEditUser = (user) => {
        setNewUser(user)
        setInfoTime(true)
    }

    const closeEditUser = (e) => {
        e.preventDefault()

        setInfoTime(false)
        setNewUser("")
        setErrors({})
    }

    const handleChangeInfo = (e) => {
        const { name, value } = e.target

        setErrors(validation({
            ...newUser,
            [name]: value
        }))
        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const submitChangeInfo = (e) => {
        e.preventDefault()

        dispatch(updateUser({
            id: user.id,
            user: newUser
        }))
        setInfoTime(false)
    }


    useEffect(() => {
        dispatch(getUserById(id))
        dispatch(getOrderByIdUser(id))
        dispatch(getReviewsByUser(id))
    }, [])

    return (<>  
        <div className={style.bigContainer}>
            <AsideUser
                user={user}
            />
            <main className={style.main}>
                <nav>
                    <div>
                        {
                            user.image === "" 
                            ? <img src={img} alt={user.name} />
                            : <img src={user.image} alt={user.image} />
                        }
                        <h2>{user.name}</h2>
                    </div>
                </nav>  
                <div className={style.container}>
                    <div className={style.subtitles}>
                        <p>OVERVIEW</p>
                        <h2>
                            Perfil del {user.rol === "user" ? "Usuaio" : "Administrador"}
                        </h2>
                    </div>
                    <div className={style.divsInfo}>
                        <div className={style.divInfoLeft}>
                            {
                                user.banned 
                                ? <div className={style.tooltipX}>
                                    <p>🔴</p>
                                </div> 
                                : <div className={style.tooltipY}>
                                <p>🟢</p>
                                </div>
                            }
                            <button onClick={() => openEditImgUser(user)}>✎</button>
                            <div className={style.partLeftFirst}>
                                {
                                    user.image === "" 
                                    ? <img className={style.imageInfo} src={img} alt={user.name} />
                                    : <img className={style.imageInfo} src={user.image} alt={user.image} />
                                }
                                <div>
                                    <h3>{user.name}</h3>
                                    <small>
                                        {user.rol === 'user' ? "Usuario" : "Administrador"}
                                    </small>
                                </div>
                            </div>
                            <div className={style.partLeftSecond}>
                                <h4>Reseñas</h4>
                                <div>
                                    {
                                        reviewsByUser && reviewsByUser.length > 0
                                        ? <div className={style.reviews}>
                                            <p>Este usuario ha hecho {reviewsByUser.length} reseñas sobre nuestros videojuegos</p>
                                        </div> 
                                        : <p>Este usuario no ha realizado reseñas.</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={style.divInfoRight}>
                            <div className={style.titleDetails}>
                                <h2>Detalles de la cuenta</h2>
                                <button onClick={() => openEditUser(user)}>✎</button>
                            </div>
                            <div className={style.details}>
                                <div className={style.namePassword}>
                                    <div className={style.containerName}>
                                        <h4>Nombre y/o apellidos</h4>
                                        <div className={style.containerData}>
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                    <div className={style.containerPassword}>
                                        <h4>Contraseña</h4>
                                        <div className={style.containerData}>
                                            <b className={style.password}>{user.password}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.containerEmail}>
                                    <h4>Email</h4>
                                    <div className={style.containerData2}>
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className={style.containerAddress}>
                                    <h4>Dirección</h4>
                                    <div className={style.containerData2}>
                                        <span>{user.address}</span>
                                    </div>
                                </div>
                                {
                                    user.rol === 'user' 
                                    ?    <div className={style.containerPurchase}>
                                            <h4>Compras realizadas</h4>
                                            <div className={style.orders}>
                                                {
                                                    ordersUser && ordersUser.length > 0 
                                                    ? <div className={style.containerOrders}>
                                                        {
                                                            ordersUser.map((order) => {
                                                                order.products && order.products.length > 0 
                                                                ? order.products.map((product) => {
                                                                    return(<div>
                                                                        <p>{product.name}</p>
                                                                        <small>{product.price}</small>
                                                                        <button>🛈</button>
                                                                    </div>)
                                                                }) : null
                                                            })
                                                        }
                                                    </div> 
                                                    : <div className={style.noOrders}>
                                                        <p>Este usuario no ha realizado ninguna compra.</p>
                                                    </div> 
                                                }
                                            </div>
                                        </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        {
            orderTime && <div className={style.overlay}>

            </div>
        }
        {
            imgTime && <div className={style.overlay}>
                <div className={style.openImg}>
                    <div className={style.imgContainer}>
                        <button onClick={closeEditImgUser}>X</button>
                        <div>
                            {
                                newImg === "" 
                                ? <img className={style.template} src={img} alt={user.name} />
                                : <img className={style.img} src={newImg} alt={user.image} />
                            }
                        </div>
                        <input type="file" name="image" id="fileInput" onChange={uploadImg}/>
                        <label for="fileInput" className={style.custom_img_upload}>+</label>
                        <button className={style.updateImg} onClick={updateImg}>Update Image</button>
                        <p className={style.errorImg}>{errors.image ? errors.image : null}</p>
                    </div>
                </div>
            </div> 
        }
        {
            infoTime && <div className={style.overlay}>
                <div className={style.openInfo}>
                    <div className={style.infoContainer}>
                        <button onClick={closeEditUser}>X</button>
                        <div className={style.containerLabel}>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" name="name" placeholder="Change your name" value={newUser.name} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.name ? errors.name : null}</p>
                        </div>
                        <div className={style.containerLabel}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Change your email" value={newUser.email} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.email ? errors.email : null}</p>
                        </div>
                        <div className={style.containerLabel}>
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" placeholder="Change your address" value={newUser.address} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.address ? errors.address : null}</p>
                        </div>
                        <button className={style.updateUser} onClick={submitChangeInfo}>Update User</button>
                    </div>
                </div>
            </div>
        }
    </>);
}

export default DetailUser;