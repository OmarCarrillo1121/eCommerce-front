
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";


import styles from "./Landing.module.css"




const Landing = () =>{

    

    return(
        <div className={styles.Container}>

            <NavBar/>

            <div className={styles.Nav}>
            <Link to ="/tienda">
                    <h2>Catalogo</h2>
                </Link>

                <Link to= "">
                    <h2>PlayStation</h2>
                </Link>
                
                <Link to= "">
                    <h2>Xbox One</h2>
                </Link>
                  
                <Link to= "">
                    <h2>Pc</h2>
                </Link>

                <Link to = "/contactos">
                    <h2>Contacto</h2>
                </Link> 

                <Link to = "/tarjetas">
                    <h2>Tarjetas</h2>

                </Link>

            </div>
           
                
            
            
                
         
         

        </div>

        
    )
}

export default Landing;