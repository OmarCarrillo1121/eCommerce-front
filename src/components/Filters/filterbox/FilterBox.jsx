import { useEffect } from 'react'
import Style from './filterBox.module.css'

const FilterBox = ({ name, filterChange, handleCheck, check, filters }) => {
    function checked (e) {
        if (e.target.checked) handleCheck({...check, [e.target.name]: true}) 
        else delete check[e.target.name]
    }
    useEffect(() => {
        if (filters.length === 0) handleCheck({})
    },[filters.length, handleCheck])
    return (
        <div className={Style.box}>
            <input hidden name={name} type="checkbox" id={name} onChange={filterChange} 
            onClick={checked}/>
            <label htmlFor={name} 
            className={`${Object.keys(check).includes(name) && filters.length > 0
            ? Style.box_label_check 
            : Style.box_label}`}>{name}</label>
        </div>
    )
}

export default FilterBox