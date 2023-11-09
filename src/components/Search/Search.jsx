import { useState } from "react";
import { useDispatch  } from "react-redux";

import { getByName } from "../../redux/actions"
import Style from "./Search.module.css"
import searchIcon from '../../Assets/img/icon/menu/searchIcon.png'

const Search = () => {
  const dispatch = useDispatch()
    const [searching, setSearching] = useState(false)
    const [ searchTerm, setSearchTerm ] = useState("")
    
    
    const handleChange = (event) =>{

        const term = event.target.value;
        setSearchTerm(term);

        if(term.length >= 3){
          dispatch(getByName(term))
        }
    }

    const onSearch = (event) =>{
      event.preventDefault();

        if(!searchTerm) {
           alert("Debe Ingresar un Nombre")
           return;
        }
        dispatch(getByName(searchTerm));
        setSearchTerm("")
    }

    return(
      <form className={`${searching? Style.searching : Style.search}`} onSubmit={onSearch}>
        <div className={`${searching ? Style.search_button_searching : Style.search_button}`}>
          {searching && 
          <input type="search" onChange={handleChange} value={searchTerm} placeholder="Buscar un juego"/>}
          <img src={searchIcon} alt='search' onClick={() => setSearching(!searching)}/>
        </div>
      </form>
    )
}

export default Search;
