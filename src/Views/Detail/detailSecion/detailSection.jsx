import Style from "./detailSection.module.css";
import Button from "../../../components/button/button";
import Discount from "../../../components/Discount/Discount";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "../../../redux/actions";

const DetailSection = ({ games }) => {
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
  };

  const { id, name, image, price, discount } = games;
  const precioOriginal = price / (1 - discount / 100);
  return (
    <section className={Style.detail_main}>
      <img src={games?.image} alt="imagen" className={Style.detail_img} />
      <div className={Style.detail_info}>
        <h1>{games?.name}</h1>
        <div className={Style.detail_info_more}>
          <h2>{games?.platform}</h2>
          <h2>Stock: {games?.stock}</h2>
          <p>
                Seleccionados:{" "}
                {currentCart.find((element) => element.id === games.id)?.quantity || 0}
                </p>
          <h3>{games?.developer}</h3>
        </div>
        <h2 className={Style.detail_main_price}>
          <Discount price={precioOriginal} porcentaje={discount} />
        </h2>
        <div className={Style.detail_buttons}>
          <Button  onClick={() => agregarAlCarrito(games)} children={<h1>Agregar 🛒</h1>} />
        </div>
      </div>
    </section>
  );
};

export default DetailSection;
