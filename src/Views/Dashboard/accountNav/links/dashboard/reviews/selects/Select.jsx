import style from '../reviewsTable.module.css'

function Select({filter, handleChange}) {
    return (
        <div className={style.containerSelect}>
            <div>
                <b>Status: </b>
                <select id="statusSelect" onChange={handleChange}>
                    <option value="All reviews">All reviews</option>
                    <option value="Enabled reviews">Enabled reviews</option>
                    <option value="Deleted reviews">Deleted reviews</option>
                </select>
            </div>
        </div>
    )
}

export default Select;