// ReviewForm.js
import React, { useState } from "react";
import { connect } from "react-redux";
import { postReview } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import style from "./reviewForm.module.css";
import Star from "./Star";

const ReviewForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useSelector((state) => state);
  const userId = user ? user.id : null;

  const [newReview, setNewReview] = useState({
    content: "",
    rating: 1,
    userId: userId,
    videogameId: gameId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: value.trim() === "" ? "Este campo no puede estar vacío" : null,
    });

    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      // Si el usuario no está autenticado, puedes redirigirlo a la página de inicio de sesión u otra página.
      navigate("/ruta-de-inicio-de-sesion"); // Reemplaza "/ruta-de-inicio-de-sesion" con tu ruta real.
      return;
    }

    if (Object.keys(errors).some((key) => errors[key])) {
      // Si hay errores, no enviamos la solicitud
      return;
    }

    setLoading(true);

    try {
      // Envía la solicitud para crear la revisión
      await dispatch(postReview(newReview));

      // Limpia el formulario después de enviar la revisión
      setNewReview({
        content: "",
        rating: 1,
        userId: userId,
        videogameId: gameId,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error al enviar la revisión:", error);
      // Puedes manejar el error de alguna manera aquí
      setLoading(false);
    }
  };

  const handleStarClick = (selectedRating) => {
    setNewReview({
      ...newReview,
      rating: selectedRating,
    });
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} className={style}>
        <label className={style.formLabel}>
          <textarea
            className={style.formTextarea}
            name="content"
            value={newReview.content}
            onChange={handleChange}
            placeholder="Escribe tu reseña"
          />
        </label>
        <br />
        <label className={style.formLabel}>
          Puntuación:
          <div className={style.starContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                selected={rating <= newReview.rating}
                onSelect={() => handleStarClick(rating)}
              />
            ))}
          </div>
        </label>
        <br />
        <button className={style.formButton} type="submit" disabled={!userId || loading}>
          {loading ? 'Enviando...' : 'Enviar reseña'}
        </button>
        {errors.content && <p className={style.formError}>{errors.content}</p>}
      </form>
      <br />
    </div>
  );
};

export default connect(null, null)(ReviewForm);
