import { Link } from "react-router-dom";
import Style from "./Card.module.css"
import { motion } from "framer-motion";
import Discount from "../Discount/Discount"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../../redux/actions";

function Card ({ game }){

  const currentCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  useEffect(() => {
    // Se actualiza directamente el carrito global sin utilizar un estado local
    dispatch(setShoppingCart(currentCart));
    console.log("Carrito actualizado:", currentCart);
  }, [currentCart, dispatch]);

  
  const agregarAlCarrito = (game) => {
    const juegoExistente = currentCart.find((item) => item.id === game.id);
    if (!game.stock) return alert("No hay suficiente stock disponible");
    if (juegoExistente) {
      if (juegoExistente.quantity < game.stock) {
        const nuevoCarrito = currentCart.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        // Se actualiza directamente el carrito global
        dispatch(setShoppingCart(nuevoCarrito));
        alert("Se agregó el juego al carrito exitosamente");
      } else {
        alert("No hay suficiente stock disponible");
      }
    } else {
      const juegoConCantidad = { ...game, quantity: 1 };
      // Se actualiza directamente el carrito global
      dispatch(setShoppingCart([...currentCart, juegoConCantidad]));
      alert("Se agregó el juego al carrito exitosamente");
    }
  }


    const {id, name, image, price, discount } = game
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
                {/* //!Edward */}
                <p>Stock: {game.stock}</p>
                <p>
                Seleccionados:{" "}
                {currentCart.find((element) => element.id === game.id)?.quantity || 0}
                </p>
                {/* //!Bloquear boton si no hay stock */}
                <button onClick={() => agregarAlCarrito(game)}>Agregar al Carrito</button> 
                {/* //!Edward */}
            </div>
        </motion.figure>
    )
}

export default Card;
