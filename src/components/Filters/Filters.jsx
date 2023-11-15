import { useFilter } from '../../util/hook/filter/useFilter';
import FilterBy from './filterby/FilterBy';
import Style from './Filters.module.css'

const Filters = ({ setFilteredGames }) => {
    const { filters, setFilters, platforms, developer, genre, min, setMin, max, setMax } = useFilter(setFilteredGames)
    return (   
        <div className={Style.filters_container}>
            <FilterBy 
            defaultName={'Platform'} 
            names={platforms}
            setFilters={setFilters} 
            filters={filters}/>
            <FilterBy 
            defaultName={'Developer'} 
            names={developer}
            setFilters={setFilters} 
            filters={filters}/>
            <FilterBy 
            defaultName={'Genre'} 
            names={genre}
            setFilters={setFilters} 
            filters={filters}/>
            <FilterBy 
            defaultName={'Sort By'} 
            names={['range','Price: Low', 'Price: High', 'Alpha: Up', 'Alpha: Down']}
            setFilters={setFilters} 
            filters={filters}
            min={min}
            max={max}
            setMin={setMin}
            setMax={setMax}/>
            <button className={Style.clear_filters} 
            onClick={() => {setFilters([]); setMin(0); setMax(999)}}>X</button>
        </div>
    )
};
export default Filters;
