// ReviewSection.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../../src/redux/actions"; // Ajusta la ruta según tu estructura de archivos

const ReviewSection = ({ gameId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(gameId));
  }, [dispatch, gameId]);

  return (
    <div>
      <h2>Reviews</h2>
      {loading && <p>Cargando reviews...</p>}
      {error && <p>Error al cargar reviews: {error}</p>}
      {reviews.length === 0 ? (
        <p>No hay reviews disponibles.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
              <p>Rating: {review.rating}</p>
              <p>Date: {new Date(review.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
