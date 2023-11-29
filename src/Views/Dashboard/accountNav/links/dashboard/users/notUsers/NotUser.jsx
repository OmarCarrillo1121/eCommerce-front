import style from './notUser.module.css'
import img from '../../../../../../../Assets/img/icon/dashboard/sadFace.png'

function NotUser() {
    return (  
        <div className={style.container}>
            <img src={img} alt="No Users Icon" class={style.dashboardIcon}/>
            <p>Ningun usuario coincide con los criterios seleccionados</p>
        </div>
    );
}

export default NotUser;