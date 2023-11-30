import style from "../bannerTable.module.css";

function Info({ banner, closeInfo, bannerDelete, bannerRestore }) {
  return (
    <div className={style.overlay}>
      <div className={style.seeInfo}>
          <button className={style.closeAll} onClick={closeInfo}>X</button>
          <h2>{banner.title}</h2>
          <img className={style.bgBanner} src={banner.backgroundUrl} alt={banner.title} />
          <img className={style.logoBanner} src={banner.logotypeUrl} alt={banner.title}/>
          <h3>Id: {banner.id}</h3>
          {banner.banned ? (
            <button className={style.bannerFc} onClick={() => bannerRestore(banner.id)}>Recuperar</button>
          ) : (
            <button className={style.bannerFc} onClick={() => bannerDelete(banner.id)}>Borrar</button>
          )}
      </div>
    </div>
  );
}

export default Info;
