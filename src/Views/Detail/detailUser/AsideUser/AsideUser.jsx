import { NavLink } from 'react-router-dom';
import dashIcon from '../../../../Assets/img/icon/dashboard/tablero.png'
import style from '../detailUser.module.css'
import homeIcon from '../../../../Assets/img/icon/dashboard/homeIcon.png'

function AsideUser({user}) {
    return (<>  
        <aside className={style.aside}>
            <div>
                <img src={homeIcon} alt="home" />
                <NavLink className={style.catalogo} to={'/'}>Home</NavLink>
            </div>
        </aside>
    </>);
}

export default AsideUser;