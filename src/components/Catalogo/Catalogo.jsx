import { useState } from "react";
import Paginate from "../../components/Paginado/Paginado";
import CardList from "../CardList/cardList";
import { usePaginate } from "../../util/hook/games/usePaginate";
import Filters from "../Filters/Filters";
import Style from './Catalogo.module.css'

const Catalogo = () => {
  const [filteredGames, setFilteredGames] = useState([])
  const { firstIndex, lastIndex, currentPage, totalPages, setCurrentPage } = usePaginate(filteredGames)
  return (
    <div className={Style.catalogo}>
      <div className={Style.catalogo_filters}>
        <Filters setFilteredGames={setFilteredGames}/>
      </div>
      <div style={{width: 100 + '%'}}>
          <CardList indexOfFirstGame={firstIndex} 
            indexOfLastGame={lastIndex}
            currentGames={filteredGames}/>
      </div>
      <Paginate 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}/>
    </div>
  );
};

export default Catalogo;