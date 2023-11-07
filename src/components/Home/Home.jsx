

import styles from "./Home.module.css"

const Home = () =>{

    const handlerByValorado = (event) =>{
        const selectedValue = event.target.value;
    }

    const handlerFilterByName = (event) =>{
        const selectedValue = event.target.value;
    }


    return(
        <div className={styles.container}>
           
           

           <div className={styles.section_home}>

                <div>
                    <select className={styles.input} onChange={handlerFilterByName}>
                        <option className={styles.option} value="all">Nombre</option>
                        <option className={styles.option} value="A-Z">⇑ A-Z</option>
                        <option className={styles.option} value="Z-A">⇓ Z-A</option>
                    </select>
                </div>

                <div>
                    <select className = {styles.input} onChange = {handlerByValorado}>

                        <option classname ={styles.option} value = "all">Mejor valorado</option>
                        <option classname ={styles.option} value = "ascendente"> ⇑ Ascendente</option>
                        <option classname ={styles.option} value = "descendente"> ⇓ Descendente</option>

                    </select>
                </div>

                <div>
                    <select>
                        <option className = {styles.option} value = "all">Categoria</option>
                        <option className = {styles.option} value = "accion">Accion</option>
                        <option className = {styles.option} value = "arcade">Arcade</option>
                        <option className = {styles.option} value = "aventura">Aventura</option>
                        <option className = {styles.option} value = "deportivo">Deportivo</option>
                        <option className = {styles.option} value = "estrategia">Estrategia</option>
                        <option className = {styles.option} value = "simulacion">musicales</option>
                    </select>
                </div>
                <div>
                    <select>
                        <option className ={styles.option} value = "all">Consola</option>
                        <option className ={styles.option} value = "ps">PlayStation</option>
                        <option className ={styles.option} value = "xbox">Xbox</option>
                        <option className ={styles.option} value = "pc">Pc</option>
                    </select>
                </div>



           </div>


        </div>

       
    )
}

export default Home;