import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllReviews,
  getDeletedReviews,
  getEnabledReviews,
  deleteReview,
  restoreReview,
  setCurrentPage,
} from "../../../../../../redux/actions";
import style from "./reviewsTable.module.css";
import NotReviews from "./notReviews/NotReviews";
import Select from "./selects/Select";
import Info from "./info/info";
import Pagination from "../pagination/Pagination";

const ReviewsTable = () => {
  const { reviews, currentPage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);
  const [review, setReview] = useState({});
  const statusSelect = document.querySelector("#statusSelect");

  /* SET CURRENT PAGE */
  const reviewsPerPage = 10;
  const totalReviews = reviews.length;

  const firstIndex = reviewsPerPage * (currentPage - 1);
  const lastIndex = firstIndex + reviewsPerPage;

  let currentPageData = reviews.slice(firstIndex, lastIndex);

  const onPageChange = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  const openInfo = (review) => {
    setReview(review);
    setInfo(true);
  };

  const closeInfo = (e) => {
    e.preventDefault();

    setInfo(false);
    setReview("");
  };

  const filterStatus = () => {
    if (statusSelect.value !== "All reviews") {
      statusSelect.value = "All reviews";
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value === "All reviews") {
      dispatch(getAllReviews());
    } else if (value === "Enabled reviews") {
      dispatch(getEnabledReviews());
    } else if (value === "Deleted reviews") {
      dispatch(getDeletedReviews());
    }
  };

  const reviewDelete = (id) => {
    dispatch(deleteReview(id));
    setInfo(false);
    setReview("");
  };

  const reviewRestore = (id) => {
    dispatch(restoreReview(id));
    setInfo(false);
    setReview("");
  };

  const showAllReviews = (e) => {
    e.preventDefault();

    if (statusSelect.value !== "All reviews") {
      statusSelect.value = "All reviews";
    }

    dispatch(getAllReviews());
  };

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  return (
    <div className={style.tabletReviews}>
      <Select filter={filterStatus} handleChange={handleChange} />
      <table>
        <thead>
          <tr className={style.row}>
            <th></th>
            <th>ID de reseña</th>
            <th>ID de usuario</th>
            <th>ID de juego</th>
            <th>Puntuacion</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.length > 0 ? (
            currentPageData.map((review, index) => {
              const rowClass =
                index % 2 === 0 ? style["rowEven"] : style["rowOdd"];

              return (
                <tr className={`${style.row} ${rowClass}`} key={review.id}>
                  <td></td>
                  <td>{review.id}</td>
                  <td>{review.userId}</td>
                  <td>{review.videogameId}</td>
                  <td>{review.rating}</td>
                  <td>{review.banned ? "Disabled" : "Enabled"}</td>
                  <td>
                    <button onClick={() => openInfo(review)}>⚙️</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <NotReviews />
          )}
        </tbody>
      </table>
      <Pagination
        totalUsers={totalReviews}
        currentPage={currentPage}
        pageSize={reviewsPerPage}
        onPageChange={onPageChange}
      />
      <div className={style.containerMessage}>
        <p>
          <b>¿No encontraste lo que buscabas?</b> Es posible que algunas reseñas
          estén ocultas debido a los filtros que has seleccionado.
        </p>
        <button className={style.showReviews} onClick={showAllReviews}>
          Mostrar todas las reseñas
        </button>
        {reviews.length !== 1 ? (
          <small>{reviews.length} reseñas encontradas</small>
        ) : (
          <small>{reviews.length} reseña encontrada</small>
        )}
        {info && (
          <Info
            review={review}
            closeInfo={closeInfo}
            reviewDelete={reviewDelete}
            reviewRestore={reviewRestore}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewsTable;
