import { useHandle } from "../../../util/hook/common/useHandle";
import FilterBox from "../filterbox/FilterBox";
import Style from './filterBy.module.css'

const FilterBy = ({ defaultName, names, setFilters, filters }) => {
    const { handle, handleChange } = useHandle();
    function filterChange (e) {
        if (e.target.checked) {
            setFilters([...filters, e.target.name])
        } else {
            const remove = filters.filter(filter => filter !== e.target.name);
            setFilters(remove)
        }
    }
    return (
        <div className={Style.filterBox}>
            <button onClick={handleChange}>
                <span>{defaultName}</span>
                <span className={Style.filterBox_button_span}>{'>'}</span>
            </button>
            {!handle 
            ? <div className={Style.filterBox_checkboxes}>
                {names.map((name, i) => (
                    <FilterBox key={i} name={name} filterChange={filterChange}/>
                ))}
              </div>
            : null}
        </div>

    )
}

export default FilterBy