import React, { useEffect, useState } from "react";
import Style from './shoppingCard.module.css'
import ShoppingCartNav from "./shoppingCardNav/ShoppingCartNav";
import { useGames } from '../../util/hook/games/useGames'
import deleteIcon from '../../Assets/img/icon/dashboard/adminboard/eliminar.png'

export default function ShoppingCart () {
    const [precio, setPrecio] = useState(0)
    const descuento = Math.floor(precio * (100 - 10) / 100)
    console.log('precio',precio);
    return (
        <div className={Style.cart}>
            <ShoppingCartNav/>
            <div className={Style.cart_container}>
              <GamesCartList setPrecio={setPrecio} precio={precio}/>
              <div className={Style.payment}>
                <h1>Resumen</h1>
                <div>
                    <div>
                        <h2>Precio</h2>
                        <span>${precio}</span>
                    </div>
                    <div>
                        <h2>Descuento</h2>
                        <span>27%</span>
                    </div>
                    <div>
                        <h2>Total</h2>
                        <span>${descuento}</span>
                    </div>
                </div>
              </div>
            </div>
        </div>
    )
}

const GamesCartList = ({ setPrecio, precio }) => {
    const { games } = useGames()
  return (
    <div className={Style.cart_games}>
      <h1>Carrito</h1>
      {games?.map((game) => (
        <GamesCart key={game.id} 
        game={game}
        setPrecio={setPrecio}
        precio={precio}/>
      )).slice(0, 2)}
    </div>
    )
}

const GamesCart = ({game, setPrecio, precio }) => {
    console.log(game);
    useEffect(() => {
        setPrecio(prev => prev + game.price )
    },[setPrecio])
    return (
        <div className={Style.cart_games}>
            <div className={Style.game}>
        <div className={Style.game_info}>
            <img src={game.image} alt={game.name} className={Style.game_info_img}/>
            <div className={Style.game_info_data}>
              <span>{game.name}</span>
              <span>{game.developer}</span>
              <img src={deleteIcon} alt={game.name} className={Style.game_info_delete}/>
            </div>
        </div>
        <div>
          <span>{game.price}</span>
        </div>
        </div>
        </div>
    )
}