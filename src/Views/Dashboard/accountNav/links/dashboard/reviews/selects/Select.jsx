import style from "../reviewsTable.module.css";

function Select({ handleChange }) {
  return (
    <div className={style.containerSelect}>
      <div>
        <b>Estado: </b>
        <select id="statusSelect" onChange={handleChange}>
          <option value="All reviews">Todas las reseñas</option>
          <option value="Enabled reviews">Reseñas habilitadas</option>
          <option value="Deleted reviews">Reseñas deshabilitadas</option>
        </select>
      </div>
    </div>
  );
}

export default Select;
