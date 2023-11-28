import style from "../bannerTable.module.css";

function Select({ handleChange }) {
  return (
    <div className={style.containerSelect}>
      <div>
        <b>Estado:</b>
        <select id="statusSelect" onChange={handleChange}>
          <option value="All banners">Todos los banners</option>
          <option value="Enabled banners">Banners habilitados</option>
          <option value="Deleted banners">Banners deshabilitados</option>
        </select>
      </div>
    </div>
  );
}

export default Select;
