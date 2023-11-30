import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  postReview,
} from "../../../redux/actions";
import styles from "./reviewSection.module.css";
import { FaStar } from "react-icons/fa";
import ReviewForm from "./reviewForm/ReviewForm";
import { useState } from "react";


const ReviewsSection = ({
  gameId,
  reviews,
  loading,
  error,
  fetchReviewsRequest,
  fetchReviewsSuccess,
  fetchReviewsFailure,
}) => {
  const [loadedReviews, setLoadedReviews] = useState(4);

  useEffect(() => {
    fetchReviewsRequest();
    // fetch(`https://ecomercestorebacken.vercel.app/reviews/videogame/${gameId}`)
    fetch(`http://localhost:3001/reviews/videogame/${gameId}`)
      .then((response) => response.json())
      .then((data) => fetchReviewsSuccess(data))
      .catch((err) => fetchReviewsFailure(err));
  }, [gameId, fetchReviewsRequest, fetchReviewsSuccess, fetchReviewsFailure]);

  const loadMoreReviews = () => {
    setLoadedReviews((prevLoadedReviews) => prevLoadedReviews + 4);
  };

  const showLessReviews = () => {
    setLoadedReviews((prevLoadedReviews) =>
      prevLoadedReviews > 4 ? prevLoadedReviews - 4 : 4
    );
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const authUserData = JSON.parse(localStorage.getItem('authUserInfo'));
  const userId = authUserData ? authUserData.id : null;

  return (
    <div className={styles.reviewSection}>
      <h2>Reseñas</h2>
      <ReviewForm gameId={gameId} userId={userId} />
      {reviews.slice(0, loadedReviews).map((review) => (
        <div key={review.id} className={styles.review}>
          <div className={styles.rating}>
            {Array.from({ length: review.rating }, (_, index) => (
              <FaStar key={index} className={styles.star} />
            ))}
          </div>
          <div className={styles.content}>{review.content}</div>
        </div>
      ))}
      {reviews.length > loadedReviews && (
        <button onClick={loadMoreReviews}>Mostrar todas las reseñas</button>
      )}
      {loadedReviews > 4 && (
        <button onClick={showLessReviews}>Mostrar menos reseñas</button>
      )}
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