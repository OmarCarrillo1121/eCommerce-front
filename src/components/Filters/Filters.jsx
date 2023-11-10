import { useFilter } from '../../util/hook/filter/useFilter';
import FilterBy from './filterby/FilterBy';
import Style from './Filters.module.css'

const Filters = ({ setFilteredGames }) => {
    const { filters, setFilters, platforms, developer, genre } = useFilter(setFilteredGames)
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
        </div>
    )
};
export default Filters;
