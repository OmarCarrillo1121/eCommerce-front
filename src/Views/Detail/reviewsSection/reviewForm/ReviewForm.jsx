// ReviewForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ gameId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const authUserData = JSON.parse(localStorage.getItem('authUserInfo'));
  const userId = authUserData ? authUserData.id : null;

  const [newReview, setNewReview] = useState({
    content: '',
    rating: 1,
    userId: userId,
    videogameId: gameId, // Agrega la propiedad videogameId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: value.trim() === '' ? 'Este campo no puede estar vacío' : null,
    });

    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) {
      // Si hay errores, no enviamos la solicitud
      return;
    }

    setLoading(true);

    try {
      // Envía la solicitud para crear la review
      await dispatch(postReview(newReview));

      // Limpia el formulario después de enviar la review
      setNewReview({
        content: '',
        rating: 1,
        userId: String(userId),
        videogameId: gameId, // Asegúrate de incluir la propiedad videogameId
      });

      setLoading(false);
    } catch (error) {
      console.error('Error al enviar la review:', error);
      // Puedes manejar el error de alguna manera aquí
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Contenido:
          <textarea
            name="content"
            value={newReview.content}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Puntuación:
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Review'}
        </button>
        {errors.content && <p>{errors.content}</p>}
      </form>
    </div>
  );
};

export default connect(null, null)(ReviewForm);