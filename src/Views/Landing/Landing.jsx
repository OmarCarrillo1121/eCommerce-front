import Style from "./Landing.module.css"
import Home from "../Home/Home";
import { Carrousel } from './Carrousel/carrousel'

const Landing = () =>{
    return(
      <main>
        <section>
            <Carrousel />
            <div className={Style.landing_clip_path}/>
        </section>
        <Home/>
      </main>
    )
}

export default Landing;