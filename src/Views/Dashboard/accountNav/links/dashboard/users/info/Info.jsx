import style from '../userTable.module.css'
import { NavLink } from 'react-router-dom';
import img from '../../../../../../../Assets/img/icon/dashboard/adminboard/person.jpg'

function Info({user, closeInfo, unbanToUser, banToUser, viewMore}){
    return (  
        <div className={style.overlay}>
                <div className={style.seeInfo}>
                    <div className={style.containerImg}>
                        <button onClick={closeInfo}>X</button>
                        {
                            user.image === "" 
                            ? <img src={img} alt="person"/>
                            : <img src={user.image} alt={user.name} />
                        }
                        <h3>{user.name}</h3>
                    </div>
                    <div className={style.containerInfo}>
                        <div className={style.details}>
                            <p><span>Role:</span>&nbsp;&nbsp;<b>{user.rol}</b></p>
                            <p><span>Email:</span>&nbsp;&nbsp;<b>{user.email}</b></p>
                            <p><span>Address:</span>&nbsp;&nbsp;<b>{user.address}</b></p>
                        </div>
                        <div className={style.btnStatus}>
                            {
                                user.banned 
                                ?   <button onClick={() => unbanToUser(user.id)}>UnBan</button>
                                :   <button onClick={() => banToUser(user.id)}>Ban</button>
                            }
                        </div>
                        <div className={style.containerBtn}>
                            <div className={`${style.btn} ${style.btn2}`} id="button-2">
                                <div className={style.slideBtn}></div>
                                <NavLink className={style.view} to={`/user/${user.id}`}>
                                    View more <small>{viewMore}</small>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Info;