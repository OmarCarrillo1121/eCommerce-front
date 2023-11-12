import { useState } from "react";
import { useHandle } from "../../../util/hook/common/useHandle";
import _ from 'lodash'
import FilterBox from "../filterbox/FilterBox";
import Style from './filterBy.module.css'

const FilterBy = ({ defaultName, names, setFilters, filters }) => {
    const { handle, handleChange } = useHandle();
    const [check, handleCheck] = useState({});
    function filterChange (e) {
        if (e.target.checked) setFilters([...filters, e.target.name])
        else {
          const borrar = filters.filter(filter => filter !== e.target.name)
          setFilters(borrar)
        }
    }
    const newArray = _.zipObject(names, names.map(value => ({ [value]: value })));
    return (
        <div className={Style.filterBox}>
            <button onClick={handleChange}>
                <span>{defaultName}</span>
                <span className={Style.filterBox_button_span}>{'>'}</span>
            </button>
            {!handle 
            ? <div className={Style.filterBox_checkboxes}>
                {Object.keys(newArray).map((name, i) => (
                    <FilterBox 
                    key={i} 
                    name={name}
                    filterChange={filterChange}
                    handleCheck={handleCheck}
                    check={check}
                    filters={filters}/>
                ))}
              </div>
            : null}
        </div>

    )
}

export default FilterBy