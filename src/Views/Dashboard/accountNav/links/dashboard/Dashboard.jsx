import style from './dashboard.module.css'
import UserTable from './users/UserTable';

export function Dashboard() {

    return (  
        <>
            <div className={style.graphics}></div>
            <div className={style.tablet}>
                <UserTable/>
            </div>
        </>
    );
}

