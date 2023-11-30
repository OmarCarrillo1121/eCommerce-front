import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Style from './carrousel.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getEnabledBanners } from '../../../redux/actions';

export const Carrousel = ({ interval = 15000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getEnabledBanners());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [banners.length, interval]);

  const activeBanner = banners[currentIndex];

  return (
    <div>
      {activeBanner && (
          <article
            style={{ backgroundImage: `url(${activeBanner.backgroundUrl})` }}
            className={`${Style.landing} ${Style.active}`}
          >
            <div className={Style.landing_text}>
              <h2>Ancora Games</h2>
              <p>En Ancora Games, tu destino para la mejor experiencia de compra de videojuegos,
                 explorarás un mundo lleno de emocionantes aventuras virtuales. 
                 Desde épicos juegos de acción hasta cautivadoras historias narrativas, 
                 ofrecemos una amplia gama de títulos para todas las plataformas.
                 <br />
                 <Link to={'/catalogo'}> Explora nuestro catálogo</Link>, aprovecha las ofertas exclusivas y sumérgete en el emocionante mundo de los videojuegos.</p>
            </div>
            <img src={activeBanner.logotypeUrl} alt={activeBanner.title} title={activeBanner.title} />
          </article>
      )}
    </div>
  );
};
