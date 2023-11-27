import { useState, useEffect } from 'react';
import Users from './graphicUsers/users/Users';
import style from './insights.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getAllUsers } from '../../../../../redux/actions';

function Insights() {
    const { users, allGames } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [componentsIndex, setComponentsIndex] = useState(0)
    const [isActive, setIsActive] = useState(true);

    const components = [
        <Users/>,
        <Users/>
    ]
    const componentsNames = [
        users,
        allGames,
        "Orders",
        "Reviews",
        "Banners",
    ]
    const componentDescription = [
        "Total users",
        "Total videogames",
        "Total orders",
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
        console.log('====================================');
        console.log(allGames);
        console.log('====================================');
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