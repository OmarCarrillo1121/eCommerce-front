import style from './notReviews.module.css';
import img from "../../../../../../../Assets/img/icon/dashboard/sadFace.png"

function NotReviews() {
  return (
    <div className={style.container}>
      <img src={img} alt="No Users Icon" class={style.dashboardIcon} />
      <p>Ninguna reseña coincide con los criterios seleccionados.</p>
    </div>
  );
}

export default NotReviews;
