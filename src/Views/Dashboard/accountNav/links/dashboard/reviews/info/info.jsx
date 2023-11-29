import { useEffect } from 'react';
import style from '../reviewsTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../../../../../redux/actions';

function Info ({ review, closeInfo, reviewDelete, reviewRestore }) {
    const {user} = useSelector(state => state)
    const dispatch = useDispatch()
    let stars = []

    const changeDate = (date) => {
        let fecha = new Date(date);

        // Restar 3 horas a la fecha
        fecha.setUTCHours(fecha.getUTCHours() - 3);

        // Obtener los componentes de la fecha después de restar 3 horas
        let dia = fecha.getUTCDate();
        let mes = fecha.getUTCMonth() + 1; // Los meses van de 0 a 11
        let anio = fecha.getUTCFullYear();
        let horas = fecha.getUTCHours();
        let minutos = fecha.getUTCMinutes();
        let segundos = fecha.getUTCSeconds();

        // Agregar ceros a la izquierda si es necesario
        dia = dia < 10 ? "0" + dia : dia;
        mes = mes < 10 ? "0" + mes : mes;
        horas = horas < 10 ? "0" + horas : horas;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        // Formatear la fecha como desees
        let fechaFormateada = " " + dia + "-" + mes + "-" + anio + " a las " + horas + ":" + minutos + ":" + segundos;
        return fechaFormateada
    }

    useEffect(() => {
        dispatch(getUserById(review.userId))
        for (let i = 0; i < review.rating; i++) {
            stars.push(1)
        }
    },[])  

    return (
        <div className={style.overlay}>
            <div className={style.seeInfo}>
                <div className={style.containerImg}>
                    <button onClick={closeInfo}>X</button>
                    <img src={user.image} alt={user.image} />
                    <h3>{user.name}</h3>
                </div>
                <div className={style.containerInfo}>
                    <div className={style.details}>
                        <p><span>Contenido:</span>&nbsp;&nbsp;<b>{review.content}</b></p>
                        <p><span>Puntuación:</span>&nbsp;&nbsp;<b>{review.rating}/5</b></p>
                    </div>
                    {
                        review.banned
                        ? <button onClick={() => reviewRestore(review.id)}>Recuperar</button>
                        : <button onClick={() => reviewDelete(review.id)}>Borrar</button>
                    }
                    <small>{user.name} realizó esta reseña el día {changeDate(review.date)} </small>
                </div>
            </div>
        </div>
    )
}

export default Info;