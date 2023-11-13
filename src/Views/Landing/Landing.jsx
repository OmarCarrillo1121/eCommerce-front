import Style from "./Landing.module.css"
import Home from "../Home/Home";
import btf from '../../Assets/img/background/bft.webp'
import btfLogo from '../../Assets/img/background/bftLogo.webp'
import rdr from '../../Assets/img/background/rdr.webp'
import rdrLogo from '../../Assets/img/background/rdrlogo.webp'
import { Components, Carrousel } from './Carrousel/carrousel'

const Landing = () =>{
  const arrayOfComponents = [
  <Components name='Battlefield 1' price='32.71' offer='32%' bg={btf} img={btfLogo}/>, 
  <Components name='Red Dead Redemption 2' price='40.71' offer='20%' bg={rdr} img={rdrLogo}/>]
    return(
      <main>
        <section>
            <Carrousel components={arrayOfComponents}/>
            <div className={Style.landing_clip_path}/>
        </section>
        <Home/>
      </main>
    )
}

export default Landing;