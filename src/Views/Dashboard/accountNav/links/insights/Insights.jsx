import { useState, useEffect } from 'react';
import Users from './graphicUsers/users/Users';
import style from './insights.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getAllUsers, getOrders } from '../../../../../redux/actions';
import Games from './graphicUsers/games/Games';
import Orders from './graphicUsers/orders/Orders';

function Insights() {
    const { allUsers, activeGames, allOrders } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [componentsIndex, setComponentsIndex] = useState(0)
    const [isActive, setIsActive] = useState(true);

    const components = [
        <Users users={allUsers}/>,
        <Orders orders={allOrders}/>,
        <Games games={activeGames}/>,
    ]
    const componentsNames = [
        allUsers,
        allOrders,
        activeGames,
        "Reviews",
        "Banners",
    ]
    const componentDescription = [
        "Total users",
        "Total orders",
        "Total videogames",
        "Total reviews",
        "Active banners",
    ]

    const handleComponentClick = (index) => {
        setComponentsIndex(index)
        setIsActive(true);
    } 

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllGames())
        dispatch(getOrders())
    }, [])

    return (  
        <>
            <div className={style.tablet}>
                <nav className={style.navbar}>
                    <div className={style.title}>
                        <h1>Insights</h1>
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