import style from './notReviews.module.css';
import img from "../../../../../../../Assets/img/icon/dashboard/sadFace.png"

function NotReviews() {
  return (
    <div className={style.container}>
      <img src={img} alt="No Users Icon" class={style.dashboardIcon} />
      <p>No reviews match the selected criteria</p>
    </div>
  );
}

export default NotReviews;
