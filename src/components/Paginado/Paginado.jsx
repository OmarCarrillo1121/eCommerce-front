import React from "react";
import Style from './paginado.module.css'

const Paginado = ({ gamesPerPage, allGames, paginado }) => {
  // calcula el número de páginas teniendo en cuenta la cantidad total de games y la cantidad por página.
  const pageNumbers = [];
  //Math.ceil redondea hacia arriba el resultado de la division
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <ul className={Style.paginate}>
          {pageNumbers &&
            pageNumbers.map((number, index) => (
              <p key={index}>
                <button onClick={() => paginado(number)} className={Style.paginate_buttons}>{number}</button>
              </p>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
