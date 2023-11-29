import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
} from "../../../redux/actions";
import styles from "./reviewSection.module.css";
import { FaStar } from "react-icons/fa";

const ReviewsSection = ({
  gameId,
  reviews,
  loading,
  error,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
}) => {
  useEffect(() => {
    fetchReviewsRequest();
    fetch(`https://ecomercestorebacken.vercel.app/reviews/videogame/${gameId}`)
      .then((response) => response.json())
      .then((data) => fetchReviewsSuccess(data))
      .catch((err) => fetchReviewsFailure(err));
  }, [gameId, fetchReviewsRequest, fetchReviewsSuccess, fetchReviewsFailure]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (reviews.length === 0) {
    return (
      <div>
        <p>No hay reviews disponibles.</p>
      </div>
    );
  }

  return (
      <div className={styles.reviewSection}>
        <h2>Reseñas</h2>
        {reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <div className={styles.rating}>
              {/* Render stars based on review.rating */}
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className={styles.star} />
              ))}
            </div>
            <div className={styles.content}>{review.content}</div>
          </div>
        ))}
      </div>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = {
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSection);
