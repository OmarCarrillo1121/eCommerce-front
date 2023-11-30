
import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import ReviewsUser from "./ReviewsUser/ReviewsUser";
import OrderHis from "./OrderHis/OrderHis";
import style from './myProfile.module.css'
import img from '../../Assets/img/icon/dashboard/usuario.png';
//import AsideUser from "../Detail/detailUser/AsideUser/AsideUser";
//import NavBar from "../../components/NavBar/navbar/NavBar";
import { validation } from "./validation/validation";


function MyProfile() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user } = useSelector((state) => state)

    const [validationErrors, setValidationErrors] = useState({});//🎀
    

    const [ newUser, setNewUser ] = useState({})

    const [ imgTime, setImgTime ] = useState(false)
    const [ newImg, setNewImg ] = useState("")
    const [ infoTime, setInfoTime ] = useState(false)

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
        alert("Se han modificado tus datos ✅");
        window.location.reload();
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
    }

    const handleChangeInfo = (e) => {
        const { name, value } = e.target

        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const submitChangeInfo = (e) => {
        e.preventDefault();
//🎀Agregado:
        const errors = validation(newUser);
        if (Object.keys(errors).length > 0){
            //Aqui agregar el manejo de errores:
            setValidationErrors(errors);
            console.log(errors);
        }else{
//hasta aca -
        dispatch(updateUser({
            id: user.id,
            user: newUser
        }))
        setInfoTime(false)
        alert("Se han modificado tus datos ✅");
        window.location.reload();
    }
    }

    useEffect(() => {
        dispatch(getUserById(id))
    }, [])

    return (<>  
            
        <div className={style.bigContainer} >
                <Link to ={"/"}>
            <button className={style.button}>
                     Home
            </button>
                     </Link>
            <main className={style.main}>
                
                <div className={style.container}>
                    <div className={style.subtitles}>
                        
                        <h2>
                            {user.rol === "user" ? "User" : "Admin"} Profile
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
                                        {user.rol === 'user' ? "User" : "Admin"}
                                    </small>
                                </div>
                            </div>
                          
                        </div>
                        <div className={style.divInfoRight}>
                            <div className={style.titleDetails}>
                                <h2>Account Details</h2>
                                <button onClick={() => openEditUser(user)}>✎</button>
                            </div>
                            <div className={style.details}>
                                <div className={style.namePassword}>
                                    <div className={style.containerName}>
                                        <h4>Full Name</h4>
                                        <div className={style.containerData}>
                                            <span>{user.name}</span>
                                        </div>
                                    </div>
                                    <div className={style.containerPassword}>
                                        <h4>Password</h4>
                                        <div className={style.containerData}>
                                            <b>{user.password}</b>
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
                                    <h4>Address</h4>
                                    <div className={style.containerData2}>
                                        <span>{user.address}</span>
                                    </div>
                                </div>
                               

                                {/*
                                    user.rol === 'user' 
                                    ?    <div className={style.containerPurchase}>
                                            <h4>Purchased Products🟣</h4>
                                            <div className={style.orders}>
                                                {
                                                    user.orders ? "ok" 
                                                    : <div className={style.noOrders}>
                                                        <p>This user has not made any purchases here yet.</p>
                                                    </div> 
                                                }
                                            </div>
                                            </div>
                                            : null
                                        */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ReviewsUser  />
            <OrderHis />
        </div>
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
                    </div>
                </div>
            </div> 
        }
        {
            infoTime && <div className={style.overlay}>
                <div className={style.openInfo}>
                    <div className={style.infoContainer}>
                        <button onClick={closeEditUser}>X</button>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" name="name" placeholder="Change your name" value={newUser.name} onChange={handleChangeInfo}/>
                            {validationErrors.name && <p className={style.error}>{validationErrors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Change your email" value={newUser.email} onChange={handleChangeInfo}/>
                            {validationErrors.email && <p className={style.error}>{validationErrors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" placeholder="Change your address" value={newUser.address} onChange={handleChangeInfo}/>
                            {validationErrors.address && <p className={style.error}>{validationErrors.address}</p>}
                        </div>
                        <button className={style.updateUser} onClick={submitChangeInfo}>Update User</button>
                       
                    </div>
                </div>
            </div>
        }
     
    </>);
}

export default MyProfile;