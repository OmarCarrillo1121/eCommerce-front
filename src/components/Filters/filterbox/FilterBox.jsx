import Style from './filterBox.module.css'

const FilterBox = ({ name, filterChange, handleCheck, check }) => {
    function checked (e) {
        if (e.target.checked) handleCheck({...check, [e.target.name]: true}) 
        else delete check[e.target.name]
    }
    return (
        <div className={Style.box}>
            <input hidden name={name} type="checkbox" id={name} onChange={filterChange} 
            onClick={checked}/>
            <label htmlFor={name} 
            className={`${check[name] === true 
            ? Style.box_label_check 
            : Style.box_label}`}>{name}</label>
        </div>
    )
}

export default FilterBox