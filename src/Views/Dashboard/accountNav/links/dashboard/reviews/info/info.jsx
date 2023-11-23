import style from '../reviewsTable.module.css';
import { NavLink } from 'react-router-dom';

function Info ({ review, closeInfo, reviewDelete, reviewRestore }) {
    return (
        <div className={style.overlay}>
            <div className={style.seeInfo}>
                <div className={style.containerImg}>
                    <button onClick={closeInfo}>X</button>
                </div>
                <h3>{review.userId}</h3>
            </div>
            <div className={style.containerInfo}>
                <div className={style.details}>
                    <p><span>Content:</span>&nbsp;&nbsp;<b>review.content</b></p>
                    <p><span>Rating:</span>&nbsp;&nbsp;<b>review.rating</b></p>
                </div>
                <div className={style.btnStatus}>
                    {
                        review.banned
                        ? <button onClick={() => reviewRestore(review.id)}>Restore</button>
                        : <button onClick={() => reviewDelete(review.id)}>Delete</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Info;