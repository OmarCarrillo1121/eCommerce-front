import style from '../userTable.module.css'

function Select({filterRol, handleChange}) {
    return (  
        <div className={style.containerSelect}>
            <div>
                <b>Rol: </b>
                <select id="rolSelect" onChange={filterRol}>
                    <option value="All roles">Todos</option>
                    <option value="admin">Admin</option>
                    <option value="user">Usuario</option>
                </select>
            </div>
            <div>
                <b>Estado: </b>
                <select id="statusSelect" onChange={handleChange}>
                    <option value="All users">Todos</option>
                    <option value="Users not Banned">Activo</option>
                    <option value="Users Banned">Baneado</option>
                </select>
            </div>
        </div>
    );
}

export default Select;