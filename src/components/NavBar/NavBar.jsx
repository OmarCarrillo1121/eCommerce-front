import { Link } from "react-router-dom";
import  Search from "../Search/Search";
import  cerrarSesion  from "../../Assents/cerrarSesion.png"
import admin from "../../Assents/gerente.png";
import carrito2 from "../../Assents/carrito2.avif"
import styles from "./NavBar.module.css";


const NavBar = () =>{

    return(

        <div className={styles.container}>
            <Link to= {"/"}>
                
                <img  className={styles.btn} src={cerrarSesion} />
               
            </Link>

        <Search />

        <Link to= {"/admin"}>

                <img  className={styles.btn} src={admin} />
               
        </Link>

        <img className={styles.btn} src={carrito2} />

        



        </div>
       
    )
}

export default NavBar;