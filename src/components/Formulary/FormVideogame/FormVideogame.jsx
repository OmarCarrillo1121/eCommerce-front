import style from "./formVideogame.module.css"
import template from '../../../Assets/img/background/bgVideogameForm.jpg'
import { useState } from "react";
import { validation } from './validation.js'
import { useDispatch } from 'react-redux'
import { postVideogame } from "../../../redux/actions.js";

function FormVideogame() {
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
        discount: 0,
        deleted: false
    })
    const [ image, setImage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ errors, setErrors ] = useState({})
    const dispatch = useDispatch()
    const stock = [];
    const discount = [];

    for (let i = 1; i <= 100; i++) {
        stock.push(i)
    }

    for (let i = 0; i < 100; i++) {
        discount.push(i)
    }

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

        setNewVideogame({
            name: "",
            description: "",
            image: "",
            genre: "",
            developer: "",
            platform: "",
            price: 0,
            stock: 0,
            discount: 0, 
            deleted: false
        })
        setLoading(false)
        setImage("")
        
        dispatch(postVideogame(newVideogame))
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
                            <input 
                                type="text"
                                name="genre"
                                value={newVideogame.genre}
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
                                <select name="stock" onChange={handleChange} value={newVideogame.stock}>
                                    {
                                        stock.length > 0 
                                        ? stock.map((elem) => {
                                            return (<option key={elem} value={elem}>{elem}</option>)
                                        }) : null
                                    }
                                </select>
                                <br/>
                                <p>
                                    {errors.stock ? errors.stock : null}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="discount">Discount:</label>
                                <select name="discount" onChange={handleChange} value={newVideogame.discount}>
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