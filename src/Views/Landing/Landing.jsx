import { Link } from "react-router-dom";
import FormUser from "../../components/Formulary/FormUser/FormUser"
import styles from "./Landing.module.css"




const Landing = () =>{

    

    return(
        <div className={styles.Container}>
            <h1 className={styles.h1}> Bienvenidos </h1>
            
            {/* <Link to= {"/home"}>
               <button  className={styles.btn} type="submit">Home</button>
           
           </Link> */}
           <FormUser/>

        </div>

        
    )
}

export default Landing;