import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { editVideogame, getByGamesDetail } from "../../../redux/actions";
import style from "./formVideogame.module.css"
import { validation } from "./validationEditeGame.js";

function EditVideogame() {
    const [ platforms] = useState([
        "PC", "PlayStation", "Xbox One", "Nintendo Switch"
    ]) 
    const { detailGame } = useSelector((state) => state)
    const [ editedVideogame, setEditedVideogame ] = useState({...detailGame})
    const [ image, setImage ] = useState(editedVideogame.image);
    const [ errors, setErrors ] = useState({})
    const dispatch = useDispatch()
    const { id } = useParams()
    const stock = [];
    const discount = [];


    for (let i = 1; i <= 100; i++) {
        stock.push(i)
    }

    for (let i = 0; i < 100; i++) {
        discount.push(i)
    }

    useEffect(() => {
        dispatch(getByGamesDetail(id))
    }, [id, dispatch])

    const handleChange = (e) => {
        const { name, value } = e.target

        setEditedVideogame({
            ...editedVideogame,
            [name]: value,
            deleted: false
        })
        setErrors(validation({
            ...editedVideogame,
            [name]: value,
            deleted: false
        }))
    }

    const UploadImage = async (e) => {
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
        setImage(file.secure_url)
        setErrors(validation({
            ...editVideogame,
            image: file.secure_url,
            deleted: false
        }))
        setEditedVideogame({
            ...editedVideogame,
            image: file.secure_url,
            deleted: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setEditedVideogame({...detailGame})
        setImage(detailGame.image)

        dispatch(editVideogame({id, editedVideogame}))
    }


    return (  
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.containerLabelInput}>
                    <div>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" 
                                name="name"
                                value={editedVideogame.name}
                                placeholder="Enter the name of the videogame..."
                                onChange={handleChange}
                            />
                            <br/>
                            <p>
                                {errors.name ? errors.name : null}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="developer">Developer:</label>
                            <input
                                type="text"
                                name="developer" 
                                value={editedVideogame.developer}
                                placeholder="Enter the developer of the videogame..."
                                onChange={handleChange}
                            />
                            <br/>
                            <p>
                                {errors.developer ? errors.developer : null}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="genre">Genre:</label>
                            <input 
                                type="text"
                                name="genre"
                                value={editedVideogame.genre}
                                placeholder="Enter the genre of the videogame..."
                                onChange={handleChange}
                            />
                            <br/>
                            <p>
                                {errors.genre ? errors.genre : null}
                            </p>
                        </div>
                        <div>
                            <label htmlFor="platform">Platform:</label>
                            <select name="platform" onChange={handleChange}>
                                {
                                    platforms && platforms.length > 0 
                                    ? platforms.map((platform) => {
                                        return (
                                            <option value={platform}>{platform}</option>
                                        )
                                    }) : null
                                }
                            </select>
                            <br/>
                            <p>
                                {errors.platform ? errors.platform : null}
                            </p>
                        </div>
                    </div> 
                    <div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea 
                                name="description"
                                value={editedVideogame.description}
                                placeholder="Enter a description for this game..."
                                onChange={handleChange}
                            ></textarea>
                            <br/>
                            <p>
                                {errors.description ? errors.description : null}
                            </p>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="price">Price in USD:</label>
                                <input 
                                    type="number"
                                    name="price"
                                    value={editedVideogame.price}
                                    onChange={handleChange}
                                />
                                <br/>
                                <p>
                                    {errors.price ? errors.price : null}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="stock">Stock:</label>
                                <select name="stock" onChange={handleChange} value={editedVideogame.stock}>
                                    {
                                        stock.length > 0 
                                        ? stock.map((elem) => {
                                            return (<option key={elem} value={elem}>{elem}</option>)
                                        }) : null
                                    }
                                </select>
                                <br />
                                <p>
                                    {errors.stock ? errors.stock : null}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="discount">Discount:</label>
                                <select name="discount" onChange={handleChange} value={editedVideogame.discount}>
                                    {
                                        discount.length > 0 
                                        ? discount.map((elem) => {
                                            return (<option key={elem} value={elem}>{elem}</option>)
                                        }) : null
                                    }
                                </select>
                                <br/>
                                <p>
                                    {errors.discount ? errors.discount : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.divImage}>
                    <div className={style.imgContainer}>
                        <img src={image} alt="" className={style.img}/>
                    </div>
                    <div className={style.containerInputImg}>
                        <input type="file" name="image" onChange={UploadImage}/>
                        <br/>
                        <p>
                            {errors.image ? errors.image : null}
                        </p>
                    </div>
                </div>
                <button type="submit"
                    disabled={Object.keys(errors).length > 0 || 
                        !editedVideogame.name ||
                        !editedVideogame.description ||
                        !editedVideogame.genre ||
                        !editedVideogame.image ||
                        !editedVideogame.developer ||
                        !editedVideogame.platform ||
                        !editedVideogame.price || 
                        !editedVideogame.stock  
                        ? true : false}
                >Submit</button>
            </form>
        </div>
    );
}

export default EditVideogame;