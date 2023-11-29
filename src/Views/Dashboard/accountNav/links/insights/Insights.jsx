import { useState, useEffect } from 'react';
import Users from './graphicUsers/users/Users';
import style from './insights.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getActiveGames, getAllBanners, getAllGames, getAllReviews, getAllUsers, getOrders } from '../../../../../redux/actions';
import Games from './graphicUsers/games/Games';
import Orders from './graphicUsers/orders/Orders';
import Banners from './graphicUsers/banners/Banners';
import Reviews from './graphicUsers/reviews/Reviews';

function Insights() {
    const { allUsers, activeGames, allOrders, allBanners, allReviews } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [componentsIndex, setComponentsIndex] = useState(0)
    const [isActive, setIsActive] = useState(true);

    const components = [
        <Users users={allUsers}/>,
        <Orders orders={allOrders}/>,
        <Banners banners={allBanners}/>,
        <Reviews reviews={allReviews}/>,
        <Games games={activeGames}/>,
    ]
    const componentsNames = [
        allUsers,
        allOrders,
        allBanners,
        allReviews,
        activeGames,
    ]
    const componentDescription = [
        "Usuarios totales",
        "Ordenes totales",
        "Banners totales",
        "Reseñas totales",
        "Videojuegos totales",
    ]

    const handleComponentClick = (index) => {
        setComponentsIndex(index)
        setIsActive(true);
    } 

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getOrders())
        dispatch(getAllBanners())
        dispatch(getAllReviews())
        dispatch(getActiveGames())
    }, [])

    return (  
        <>
            <div className={style.tablet}>
                <nav className={style.navbar}>
                    <div className={style.title}>
                        <h1>Estadísticas</h1>
                    </div>
                    <div className={style.insights}>
                        {
                            components.map((component, index) => {
                                return (<>
                                    <div 
                                        key={index} 
                                        onClick={() => handleComponentClick(index)}
                                        className={isActive && componentsIndex === index ? style.activeButton : style.notActiveButton}
                                    >
                                        <strong>{componentDescription[index]}</strong>
                                        <h2>{componentsNames[index].length}</h2>
                                    </div>
                                </>)
                            })
                        }
                    </div>
                </nav>
                {components[componentsIndex]}
            </div>
        </>
    );
}

export default Insights;