import style from '../userTable.module.css'

function Rol({user, closeEditRol, changeRol, updatedUser}) {
    return (  
        <div className={style.overlay}>
                <div className={style.editRol}>
                    <div className={style.containerEditUser}>
                        <button onClick={closeEditRol}>X</button>
                        <strong>¿Quieres cambiar el rol {user.name}?</strong>
                        <select name="rol" onChange={changeRol} value={user.rol}>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                        <button onClick={updatedUser} className={style.updateBtn}>Guardar</button>
                    </div>
                </div> 
        </div>
    );
}

export default Rol;