import { useEffect, useState } from "react";
import { getOrderByIdUser, getReviewsByUser, getUserById, updateUser } from "../../../redux/actions";
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
    const [ order, setOrder ] = useState({})
    let productsIndex = 0;
    let productsRendered = 0
    const [ showAllOrders, setShowAllOrders] = useState(false)
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
        alert("Usuario editado con éxito")
    }

    const openInfoGame = (order) => {
        setOrder(order)
        setorderTime(true)
    }

    const closeInfoGame = () => {
        setorderTime(false)
        setOrder({})
    }

    const changeDate = (date) => {
        let fecha = new Date(date);

        // Restar 3 horas a la fecha
        fecha.setUTCHours(fecha.getUTCHours() - 3);

        // Obtener los componentes de la fecha después de restar 3 horas
        let dia = fecha.getUTCDate();
        let mes = fecha.getUTCMonth() + 1; // Los meses van de 0 a 11
        let anio = fecha.getUTCFullYear();
        let horas = fecha.getUTCHours();
        let minutos = fecha.getUTCMinutes();
        let segundos = fecha.getUTCSeconds();

        // Agregar ceros a la izquierda si es necesario
        dia = dia < 10 ? "0" + dia : dia;
        mes = mes < 10 ? "0" + mes : mes;
        horas = horas < 10 ? "0" + horas : horas;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        // Formatear la fecha como desees
        let fechaFormateada = " " + dia + "-" + mes + "-" + anio + " a las " + horas + ":" + minutos + ":" + segundos;
        return fechaFormateada
    }

    const openAllOrders = () => {
        setShowAllOrders(true)
    }

    const closeAllOrders = () => {
        setShowAllOrders(false)
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
                            Perfil del {user.rol === "user" ? "Usuario" : "Administrador"}
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
                                                    ordersUser.length > 0 
                                                    ? <div className={style.containerOrders}>
                                                        <table>
                                                            <thead>
                                                                <tr className={style.rowHead}>
                                                                    <th>Id Orden</th>
                                                                    <th>Nombre</th>
                                                                    <th>Monto total</th>
                                                                    <th>Info Orden</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {   
                                                                    ordersUser.map((order) => {
                                                                        productsIndex = productsIndex + order.products.length
                                                                        return order.products.map((product) => {
                                                                            if (productsRendered >= 4) {
                                                                                return null; // No renderizar más allá del límite
                                                                            }
                                                                            productsRendered++;
                                                                            return(<tr className={style.product}>
                                                                                <td>{order.id}</td>
                                                                                <td>{product.name}</td>
                                                                                <td>{product.price}</td>
                                                                                <td><button onClick={() => openInfoGame(order)}>🛈</button></td>
                                                                            </tr>)
                                                                        })
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div> 
                                                    : <div className={style.noOrders}>
                                                        <p>Este usuario no ha realizado ninguna compra.</p>
                                                    </div> 
                                                }
                                            </div>
                                            {
                                                productsIndex > 4 ? <button className={style.verMas} onClick={openAllOrders}>Ver Todos</button> : null
                                            }
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
            showAllOrders && <div className={style.overlay}>
                <div className={style.containerBigTable}>
                    <button onClick={closeAllOrders}>X</button>
                    <div className={style.containerMegaTable}>
                        <table>
                            <thead>
                                <tr className={style.rowHead2}>
                                    <th>Id Orden</th>
                                    <th>Nombre</th>
                                    <th>Monto total</th>
                                    <th>Info Orden</th>
                                </tr>
                            </thead>
                            <tbody>
                            {   
                                ordersUser.map((order) => {
                                    return order.products.map((product) => {
                                        return(<tr className={style.megatableProduct}>
                                            <td>{order.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td className={style.tdLast} onClick={()=> openInfoGame(order)}>🛈</td>
                                        </tr>)
                                    })
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
        {
            orderTime && <div className={style.overlay}>
                <div className={style.containerOrder}>
                    <button className={style.closeInfoOrder} onClick={closeInfoGame}>X</button>
                    <div className={style.containerText}>
                        <h2>{order.products.length > 1 ? 'Compras realizadas': 'Compra realizada'}</h2>
                        <b>Id: {order.id}</b>
                    </div>
                    <div className={style.productsContainer}>
                        <div className={style.containerProductMax}>
                            {
                                order.products.map((product) => {
                                    let amount = (product.discount/100) * product.price
                                    let totalAmount = product.price - amount

                                    return (<div className={style.cardProduct}>
                                        <img src={product.image} alt={product.name} />
                                        <span className={style.productDiscount}>-{product.discount}%</span>
                                        <div className={style.containerproductxxx}>
                                            <span className={style.productName}>{product.name}</span>
                                            <div className={style.precio}>
                                                <p>Precio $:</p>
                                                <div className={style.priceAmount}>
                                                    <span className={style.productPrice}>Antes: ${product.price}</span>
                                                    <span className={style.productAmount}>Ahora: ${totalAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                        <p className={style.dateOrder}> La compra se realizó el 
                            {
                                changeDate(order.date)
                            }
                        </p>
                        <small className={style.amountOrder}>Monto total de la compra: <b>{order.amount}</b></small>
                    </div>
                    </div>
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
                        <button className={style.updateImg} onClick={updateImg}>Actualizar Imagen</button>
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
                            <label htmlFor="name">Name y/o Apellidos</label>
                            <input type="text" name="name" placeholder="Cambia tu nombre" value={newUser.name} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.name ? errors.name : null}</p>
                        </div>
                        <div className={style.containerLabel}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Cambia tu email" value={newUser.email} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.email ? errors.email : null}</p>
                        </div>
                        <div className={style.containerLabel}>
                            <label htmlFor="address">Dirección</label>
                            <input type="text" name="address" placeholder="Cambia tu dirección" value={newUser.address} onChange={handleChangeInfo}/>
                            <p className={style.error}>{errors.address ? errors.address : null}</p>
                        </div>
                        <button className={style.updateUser} onClick={submitChangeInfo}>Actualizar datos</button>
                    </div>
                </div>
            </div>
        }
    </>);
}

export default DetailUser;