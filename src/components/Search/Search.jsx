import { useState } from "react";
import Style from "./Search.module.css"
import searchIcon from '../../Assets/img/icon/menu/searchIcon.png'

const Search = () => {
    const [searching, setSearching] = useState(false)
    const [ searchTerm, setSearchTerm ] = useState("")
    const handleChange = (event) =>{
        const term = event.target.value;
        setSearchTerm(term)
    }

    const onSearch = (term) =>{
        if(!term) {
            return alert("Debe Ingresar un Nombre")
        }
    }
    return(
      <form className={`${searching? Style.searching : Style.search}`} onSubmit={onSearch}>
        <div className={`${searching ? Style.search_button_searching : Style.search_button}`}>
          {searching && 
          <input type="text" onChange={handleChange} value={searchTerm} placeholder="Buscar un juego"/>}
          <img src={searchIcon} alt='search' onClick={() => setSearching(!searching)}/>
        </div>
      </form>
    )
}

export default Search;