// ReviewForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postReview } from '../../../../redux/actions';

const ReviewForm = ({ gameId, userId, postReview }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1); // Valor predeterminado

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que el usuario haya ingresado contenido antes de enviar la review
    if (content.trim() === '') {
      alert('Por favor, ingresa el contenido de la review');
      return;
    }

    // Crea el objeto de review
    const newReview = {
      content,
      rating,
      userId,
      videogameId: gameId,
    };

    // Envía la review
    postReview(newReview);

    // Limpia el formulario después de enviar la review
    setContent('');
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contenido:
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <br />
      <label>
        Puntuación:
        <input type="number" value={rating} onChange={handleRatingChange} min="1" max="5" />
      </label>
      <br />
      <button type="submit">Enviar Review</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.id, // Asegúrate de que tu estado contenga la información del usuario
});

const mapDispatchToProps = {
  postReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
