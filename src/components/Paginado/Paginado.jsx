import React from "react";

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
        <ul>
          {pageNumbers &&
            pageNumbers.map((number, index) => (
              <p key={index}>
                <button onClick={() => paginado(number)}>{number}</button>
              </p>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
