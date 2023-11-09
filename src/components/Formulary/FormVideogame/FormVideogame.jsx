import style from "./formVideogame.module.css"
import template from '../../../Assets/img/background/bgVideogameForm.jpg'
import { useState, useEffect } from "react";
import { validation } from './validation.js'
import { useDispatch, useSelector } from 'react-redux'

function FormVideogame() {
    const [ genres, setGenres ] = useState([
        "action", "horror", "shooter"
    ])
    const [ platforms, setPlatforms ] = useState([
        "PC", "PlayStation", "Xbox One", "Nintendo Switch"
    ]) 
    const [ newVideogame, setNewVideogame ] = useState({
        name: "",
        description: "",
        image: "",
        genre: "",
        developer: "",
        platform: "",
        price: 0,
        stock: 0, 
        deleted: false
    })
    const [ image, setImage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target

        setErrors(validation({
            ...newVideogame,
            [name]: value,
            deleted: false
        }))
        setNewVideogame({
            ...newVideogame, 
            [name]: value,
            deleted: false
        })
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
            ...newVideogame,
            image: file.secure_url,
            deleted: false
        }))
        setLoading(true)
        setNewVideogame({
            ...newVideogame,
            image: file.secure_url,
            deleted: false
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newVideogame);

        setNewVideogame({
            name: "",
            description: "",
            image: "",
            genre: "",
            developer: "",
            platform: "",
            price: 0,
            stock: 0, 
            deleted: false
        })
        setLoading(false)
        setImage("")
    }

    // useEffect(() => {
    //     dispatch(addVideogame(newVideogame))
    // }, [])

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
                                value={newVideogame.name}
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
                                value={newVideogame.developer}
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
                            <select name="genre" onChange={handleChange}>
                                {
                                    genres && genres.length > 0 
                                    ? genres.map((genre) => {
                                        return (
                                            <option value={genre}>{genre}</option>
                                        )
                                    }) : null
                                }    
                            </select> 
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
                                value={newVideogame.description}
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
                                    value={newVideogame.price}
                                    onChange={handleChange}
                                />
                                <br/>
                                <p>
                                    {errors.price ? errors.price : null}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="stock">Stock:</label>
                                <input 
                                    type="number"
                                    name="stock"
                                    value={newVideogame.stock}
                                    onChange={handleChange} 
                                />
                                <br/>
                                <p>
                                    {errors.stock ? errors.stock : null}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.divImage}>
                    <div className={style.imgContainer}>
                        {
                            loading ? (
                                <img src={image} className={style.img}/>
                            ) : (
                                <img src={template} className={style.img} alt="template image" />
                            )
                        }
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
                        !newVideogame.name ||
                        !newVideogame.description ||
                        !newVideogame.genre ||
                        !newVideogame.image ||
                        !newVideogame.developer ||
                        !newVideogame.platform ||
                        !newVideogame.price || 
                        !newVideogame.stock  
                        ? true : false}
                >Submit</button>
            </form>
        </div>
    );
}

export default FormVideogame;