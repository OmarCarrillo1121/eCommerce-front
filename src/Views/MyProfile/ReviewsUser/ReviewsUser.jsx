 import { Link } from "react-router-dom";
 import React, { useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import { useParams } from 'react-router-dom';
 import { useDispatch } from 'react-redux';
 import { getReviewsByUser, resetDetailReviewsUser } from "../../../redux/actions";
 import style from "./reviewsUser.module.css"

const ReviewsUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const reviewsByUser = useSelector(state => state.reviewsByUser);
  
    useEffect(() => {
      if (id) {
        dispatch(getReviewsByUser(id));
      }
  
       return () => {
         dispatch(resetDetailReviewsUser());
       };
    }, [dispatch, id]);
  
    return (
        <div className={style.container}>
          <div className={style.cards}>
            <h2>📃Historial de Reviews:</h2>
          </div>
          <div className={style.cardContainer}>
            {reviewsByUser.map((review) => (
              <div key={review.id}>
                <div className={style.cards}>
                 <p>Date: {new Date(review.date).toLocaleString()}</p>
                 <p>Rating: {review.rating}</p>
                 <p>Content: {review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default ReviewsUser;
 
 
 

