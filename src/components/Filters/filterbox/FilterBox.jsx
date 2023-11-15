import { Fragment, useEffect } from 'react'
import Style from './filterBox.module.css'

const FilterBox = ({ name, filterChange, handleCheck, check, filters,  min, setMin, max, setMax}) => {
    function checked (e) {
        if (e.target.checked) {
            handleCheck({...check, [e.target.name]: true})
        }
        else delete check[e.target.name]
    }
    useEffect(() => {
        if (filters.length === 0) handleCheck({})
    },[filters.length, handleCheck])
    return (
        <div className={Style.box}>
            {name === 'range'?
            <MinMax min={min} max={max} setMin={setMin} setMax={setMax}/>
            :<Fragment>
            <input hidden name={name} type="checkbox" id={name} onChange={filterChange} 
            onClick={checked}/>
            <label htmlFor={name} 
            className={`${Object.keys(check).includes(name) && filters.length > 0
            ? Style.box_label_check 
            : Style.box_label}`}>{name}</label>
            </Fragment>}
        </div>
    )
}

const MinMax = ({ min, max, setMin, setMax }) => {
    return (
        <Fragment>
        <div className={Style.box_range}>
        <div className={Style.box_range_box}>
          <label htmlFor="min">Min:</label>
          <input type="number" id="min" value={min} onChange={e => setMin(e.target.value)}/>
         </div>
         <div className={Style.box_range_box}>
          <label className={Style.box_range_label} htmlFor="max">Max:</label>
          <input type="number" value={max} id="max" onChange={e => setMax(e.target.value)}/>
        </div>
        </div>
        </Fragment>
    )
}

export default FilterBox