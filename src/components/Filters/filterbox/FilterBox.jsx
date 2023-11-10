import Style from './filterBox.module.css'

const FilterBox = ({ name, filterChange }) => {
    return (
        <div className={Style.box}>
            <input hidden name={name} type="checkbox" id={name} onChange={filterChange}/>
            <label htmlFor={name} className={Style.box_label}>{name}</label>
        </div>
    )
}

export default FilterBox