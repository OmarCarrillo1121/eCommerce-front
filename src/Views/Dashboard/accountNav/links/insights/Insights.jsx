import Users from './graphicUsers/Users';
import style from './insights.module.css'

function Insights() {
    return (  
        <>
            <div className={style.tablet}>
                <nav className={style.navbar}>
                    <h1>Insights</h1>
                    <div></div>
                </nav>
                <Users/>
            </div>
        </>
    );
}

export default Insights;