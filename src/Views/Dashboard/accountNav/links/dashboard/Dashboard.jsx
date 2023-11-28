import { useState } from "react";
import style from "./dashboard.module.css";
import UserTable from "./users/UserTable";
import ReviewsTable from "./reviews/ReviewsTable";
import BannersTable from "./banners/BannerTable";
import { useState } from 'react';
import style from './dashboard.module.css'
import UserTable from './users/UserTable';
import Games from './games/Games';

export function Dashboard() {
  const [componentsIndex, setComponentsIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

    const components = [
        <UserTable/>,
        <Games/>,
        <BannersTable/>,
        <ReviewsTable />
    ]
    const componentNames = ["Users","Videogames", "Banners", "Reviews"]

  const handleComponentClick = (index) => {
    setComponentsIndex(index);
    setIsActive(true);
  };

    return (  
        <>
            <div className={style.tablet}>
                <nav className={style.navbar}>
                    <h1>Admin Dashboard</h1>
                    <div>
                        {
                            components.map((component, index) => {
                                return (<>
                                    <button 
                                        key={index} 
                                        onClick={() => handleComponentClick(index)}
                                        className={isActive && componentsIndex === index ? style.activeButton : ''}
                                    >
                                        {componentNames[index]}
                                    </button>
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
