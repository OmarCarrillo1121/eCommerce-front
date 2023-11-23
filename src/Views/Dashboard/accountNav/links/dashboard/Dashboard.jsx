import { useState } from "react";
import style from "./dashboard.module.css";
import UserTable from "./users/UserTable";
import ReviewsTable from "./reviews/ReviewsTable";
import BannersTable from "./banners/BannerTable";

export function Dashboard() {
  const [componentsIndex, setComponentsIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const components = [<UserTable />, <ReviewsTable />, <BannersTable />];
  const componentNames = ["Users", "Reviews", "Banners"];

  const handleComponentClick = (index) => {
    setComponentsIndex(index);
    setIsActive(true);
  };

  return (
    <>
      <div className={style.tablet}>
        <nav className={style.navbar}>
          <h2>Admin Dashboard</h2>
          <div>
            {components.map((component, index) => {
              return (
                <>
                  <button
                    key={index}
                    onClick={() => handleComponentClick(index)}
                    className={
                      isActive && componentsIndex === index
                        ? style.activeButton
                        : ""
                    }
                  >
                    {componentNames[index]}
                  </button>
                </>
              );
            })}
          </div>
        </nav>
        {components[componentsIndex]}
      </div>
    </>
  );
}
