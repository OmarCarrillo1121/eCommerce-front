import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Style from './carrousel.module.css'

export const Carrousel = ({ components, interval = 15000}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
      }, interval);
  
      return () => clearInterval(intervalId);
    }, [components.length, interval]);
    return <div>{components[currentIndex]}</div>;
  }

export const Components = ({ name, price, offer, bg, img }) => {
    return (
     <Link to={'/'}>
      <article style={{backgroundImage: `url(${bg})`}} className={Style.landing}>
       <div className={Style.landing_text}>
        <h2>{name}</h2>
        <h3>
          <span>{offer}</span>{price}
        </h3>
       </div>
       <img src={img} alt="game" title={name} />
      </article>
     </Link>
    )
}