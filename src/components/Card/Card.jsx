import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Style from "./Card.module.css"
import { motion } from "framer-motion";
import Discount from "../Discount/Discount"
import { setShoppingCart  } from "../../redux/actions"

function Card ({ game }){
    const {id, name, image, price, discount } = game;
    // Edward
    const dispatch = useDispatch();
    //console.log('currentCart',currentCart);
    const [carrito, setCarrito] = useState([]);
    
    console.log('Car',carrito);

    useEffect(() => {
        dispatch(setShoppingCart(carrito))
        console.log("Carrito actualizado:", carrito);
    }, [carrito,dispatch]);

    const agregarAlCarrito = (game) => {
      // Buscamos si el juego ya está en el carrito por su id
      
      const juegoExistente = carrito.find((item) => item.id === game.id);

      if (juegoExistente) {
      // Si el juego ya está en el carrito, verificamos el stock antes de aumentar la cantidad
      if (juegoExistente.quantity < game.stock) {
          const nuevoCarrito = carrito.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          setCarrito(nuevoCarrito);
          alert("Se agregó el juego al carrito exitosamente");
      } else {
          alert("No hay suficiente stock disponible");
      }
      } else {
      // Si el juego no está en el carrito, lo agregamos con cantidad 1
      const juegoConCantidad = { ...game, quantity: 1 };
      setCarrito([...carrito, juegoConCantidad]);
      alert("Se agregó el juego al carrito exitosamente");
      }
  };


    return(
        <motion.figure className={Style.carta} key={id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          >
            <Link to={`/detail/${id}`}>
            <div className = {Style.card}>
              <img className= {Style.card_game} src={image} alt={name} />
              <span className={Style.descuento}>-{discount}%</span>
             
            </div>
            </Link>
            <div className={Style.card_price}>
                <h2 className={Style.card_name}>{name}</h2>
           
                <Discount price ={price} porcentaje= {discount} />  
            </div>
            <div>
            <p>
                quantity:{" "}
                {carrito.find((element) => element.id === game.id)?.quantity || 0}
            </p>
            
            <button onClick={() => agregarAlCarrito(game)}> Agregar al Carrito </button>
            </div>
        </motion.figure>
    )
}

export default Card