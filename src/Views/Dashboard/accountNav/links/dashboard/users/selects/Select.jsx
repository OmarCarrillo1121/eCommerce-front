import style from '../userTable.module.css'

function Select({filterRol, handleChange}) {
    return (  
        <div className={style.containerSelect}>
            <div>
                <b>Rol: </b>
                <select id="rolSelect" onChange={filterRol}>
                    <option value="All roles">All</option>
                    <option value="admin">Admins</option>
                    <option value="user">Users</option>
                </select>
            </div>
            <div>
                <b>Status: </b>
                <select id="statusSelect" onChange={handleChange}>
                    <option value="All users">All</option>
                    <option value="Users not Banned">Active</option>
                    <option value="Users Banned">Banned</option>
                </select>
            </div>
        </div>
    );
}

export default Select;