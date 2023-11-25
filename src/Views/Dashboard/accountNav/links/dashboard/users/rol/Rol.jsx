import style from '../userTable.module.css'

function Rol({user, closeEditRol, changeRol, updatedUser}) {
    return (  
        <div className={style.overlay}>
                <div className={style.editRol}>
                    <div className={style.containerEditUser}>
                        <button onClick={closeEditRol}>X</button>
                        <strong>Do you want to change the role of {user.name}?</strong>
                        <select name="rol" onChange={changeRol} value={user.rol}>
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </select>
                        <button onClick={updatedUser} className={style.updateBtn}>Save</button>
                    </div>
                </div> 
        </div>
    );
}

export default Rol;