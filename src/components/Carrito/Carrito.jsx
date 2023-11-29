// Carrito.jsx

import axios from "axios";
import styles from "./Carrito.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; //useDispatch
import { Link } from "react-router-dom";
import { setShoppingCart } from "../../redux/actions";

const Carrito = () => {
  //!Este carrito lo voy a llamar desde el reducer
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const compras = useSelector((state) => state.shopping);
  console.log(shoppingCart);
  console.log("COMPRAS", compras);
  const dispatch = useDispatch(); //setCart

  const [carrito, setCarrito] = useState([...shoppingCart]);

  //!Para enviar al back el pedido:
  //!!!!Pasar esto a las ACTIONS

  const buyGames = async (productos) => {
    try {
      console.log(productos);
      const response = await axios.post(
        "http://localhost:3001/MercadoPago",
        productos
      );

      // Realiza la redirección al enlace de pago
      window.location.href = response.data;
    } catch (error) {
      console.error("Error al procesar el pago:", error.message);
      // Puedes manejar el error según tus necesidades
    }
  };

  const renderizarProductos = () => {
    return carrito.map((producto) => (
      <div key={producto.id} className={styles["tarjeta-producto"]}>
        <img
          src={producto.image}
          alt={producto.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h3>{producto.name}</h3>
        <p>Stock: {producto.stock}</p>
        <p>{producto.quantity}</p>
        <button onClick={() => reduceQuantity(producto.id)}>[-]</button>
        <button onClick={() => addQuantity(producto)}>[+]</button>
        <p>Precio: ${producto.price}</p>
        <button onClick={() => deleteGame(producto.id)}>Delete</button>
      </div>
    ));
  };
  // //! Empieza Configuracion de funcionalidades
  const renderizarTarjetaPago = () => {
    // Aquí puedes personalizar la información y el estilo de la tarjeta de pago
    const totalCompra = carrito.reduce(
      (total, producto) => total + producto.quantity * producto.price,
      0
    );
    return (
      <div className={styles["tarjeta-pago"]}>
        <h1>Resumen de Compra:</h1>
        <h3>Total:</h3>
        <p>${totalCompra.toFixed(2)}</p>
        {/* //!Agregar los productos acá */}
        <button
          onClick={() => buyGames(carrito)}
          disabled={carrito.length === 0}
        >
          Comprar
        </button>
      </div>
    );
  };

  //!AUMENTA
  const addQuantity = (game) => {
    // Buscamos si el juego ya está en el carrito por su id
    const juegoExistente = carrito.find((item) => item.id === game.id);

    if (juegoExistente) {
      // Si el juego ya está en el carrito, verificamos el stock antes de aumentar la cantidad
      if (juegoExistente.quantity < game.stock) {
        const nuevoCarrito = carrito.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCarrito(nuevoCarrito);
      } else {
        alert("No hay suficiente stock disponible");
      }
    } else {
      // Si el juego no está en el carrito, lo agregamos con cantidad 1
      const juegoConCantidad = { ...game, quantity: 1 };
      setCarrito([...carrito, juegoConCantidad]);
    }
  };

  //!REDUCE
  const reduceQuantity = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Filtrar el juego si la cantidad se reduce a cero
    const carritoActualizado = nuevoCarrito.filter((item) => item.quantity > 0);
    setCarrito(carritoActualizado);
  };
  //!ELIMINA JUEGO DEL CARRITO
  const deleteGame = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
  };
  //!ACTUALIZA ESTADO DEL CARRITO
  useEffect(() => {
    dispatch(setShoppingCart(carrito));
    console.log("Carrito actualizado:", carrito);
  }, [dispatch, carrito]);

  return (
    <div>
      <h1>Carrito</h1>
      <button>
        <Link to="/">Catalogo</Link>
      </button>
      <div className={styles["pago-container"]}>{renderizarTarjetaPago()}</div>
      <div className={styles["contenedor-productos"]}>
        {renderizarProductos()}
      </div>
    </div>
  );
};

export default Carrito;
