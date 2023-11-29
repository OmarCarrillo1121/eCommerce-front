import style from "../bannerTable.module.css";

function Info({ banner, closeInfo, bannerDelete, bannerRestore }) {
  return (
    <div className={style.overlay}>
      <div className={style.seeInfo}>
        <div className={style.containerImg}>
          <button onClick={closeInfo}>X</button>
        </div>
        <h3>{banner.id}</h3>
      </div>
      <div className={style.containerInfo}>
        <div className={style.details}>
          {banner.banned ? (
            <button onClick={() => bannerRestore(banner.id)}>Recuperar</button>
          ) : (
            <button onClick={() => bannerDelete(banner.id)}>Borrar</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Info;
